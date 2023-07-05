import invariant from 'tiny-invariant'
import { Currency, Fraction, Percent, Price, CurrencyAmount, TokenAmount } from '../../entities'
import { createAmount, currencyIsEqual, wrappedAmount, wrappedCurrency } from '../utils'
import { sortedInsert } from '../../utils'
import { ONE, TradeType, BestTradeOptions, ZERO } from '../../constants'
import { ElixirPool as Pool } from './pool'
import { ElixirRoute } from './elixirRoute'
import { ChainId } from '../../chains'

/**
 * Trades comparator, an extension of the input output comparator that also considers other dimensions of the trade in ranking them
 * @param a The first trade to compare
 * @param b The second trade to compare
 * @returns A sorted ordering for two neighboring elements in a trade array
 */
export function elixirTradeComparator(a: ElixirTrade, b: ElixirTrade) {
  // must have same input and output token for comparison
  invariant(currencyIsEqual(a.inputAmount.currency, b.inputAmount.currency), 'INPUT_CURRENCY')
  invariant(currencyIsEqual(a.outputAmount.currency, b.outputAmount.currency), 'OUTPUT_CURRENCY')
  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      // consider the number of hops since each hop costs gas
      const aHops = a.swaps.reduce((total, cur) => total + cur.route.path.length, 0)
      const bHops = b.swaps.reduce((total, cur) => total + cur.route.path.length, 0)
      return aHops - bHops
    }
    // trade A requires less input than trade B, so A should come first
    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1
    } else {
      return 1
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1
    } else {
      return -1
    }
  }
}

/**
 * Represents a trade executed against a set of routes where some percentage of the input is
 * split across each route.
 *
 * Each route has its own set of pools. Pools can not be re-used across routes.
 *
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 */
export class ElixirTrade {
  /**
   * This is kind of deprecated method in uni code but we are still using this as
   * we are not supporting MULTIPLE_ROUTES as of now
   *
   * Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
   * this will return an error.
   *
   * When the trade consists of just a single route, this returns the route of the trade,
   * i.e. which pools the trade goes through.
   *
   * As of now we are not supporting MULTIPLE_ROUTES, so the invariant should not trigger
   * in future we might need multiple routes such that some swap will use v2 routing and some
   * swap will use elixir routing
   */
  public get route(): ElixirRoute {
    invariant(this.swaps.length === 1, 'MULTIPLE_ROUTES')
    return this.swaps[0].route
  }

  /**
   * The swaps of the trade, i.e. which routes and how much is swapped in each that
   * make up the trade.
   */
  public readonly swaps: {
    route: ElixirRoute
    inputAmount: CurrencyAmount
    outputAmount: CurrencyAmount
  }[]

  /**
   * The type of the trade, either exact in or exact out.
   */
  public readonly tradeType: TradeType

  /**
   * The cached result of the input amount computation
   * @private
   */
  private _inputAmount: CurrencyAmount | undefined

  /**
   * Chain identifier of the trade
   */
  public get chainId(): number {
    return this.swaps[0].route.chainId
  }

  /**
   * The input amount for the trade assuming no slippage.
   */
  public get inputAmount(): CurrencyAmount {
    if (this._inputAmount) {
      return this._inputAmount
    }

    const inputCurrency = this.swaps[0].inputAmount.currency
    const totalInputFromRoutes = this.swaps
      .map(({ inputAmount }) => inputAmount)
      .reduce((total, cur) => total.add(cur), createAmount(inputCurrency, 0, this.chainId))

    this._inputAmount = totalInputFromRoutes
    return this._inputAmount
  }

  /**
   * The cached result of the output amount computation
   * @private
   */
  private _outputAmount: CurrencyAmount | undefined

  /**
   * The output amount for the trade assuming no slippage.
   */
  public get outputAmount(): CurrencyAmount {
    if (this._outputAmount) {
      return this._outputAmount
    }

    const outputCurrency = this.swaps[0].outputAmount.currency
    const totalOutputFromRoutes = this.swaps
      .map(({ outputAmount }) => outputAmount)
      .reduce((total, cur) => total.add(cur), createAmount(outputCurrency, 0, this.chainId))

    this._outputAmount = totalOutputFromRoutes
    return this._outputAmount
  }

  /**
   * The cached result of the computed execution price
   * @private
   */
  private _executionPrice: Price | undefined

  /**
   * The price expressed in terms of output amount/input amount.
   */
  public get executionPrice(): Price {
    return (
      this._executionPrice ??
      (this._executionPrice = new Price(
        this.inputAmount.currency,
        this.outputAmount.currency,
        this.inputAmount.raw,
        this.outputAmount.raw
      ))
    )
  }

  /**
   * The cached result of the price impact computation
   * @private
   */
  private _priceImpact: Percent | undefined

  /**
   * Returns the percent difference between the route's mid price and the price impact
   */
  public get priceImpact(): Percent {
    if (this._priceImpact) {
      return this._priceImpact
    }

    let spotOutputAmount = createAmount(this.outputAmount.currency, 0, this.chainId)
    for (const { route, inputAmount } of this.swaps) {
      const midPrice = route.midPrice
      spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount, this.chainId))
    }

    if(this.outputAmount.greaterThan(spotOutputAmount)){
      this._priceImpact = new Percent(100, 1);
      return this._priceImpact;
    }

    const priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount)
    this._priceImpact = new Percent(priceImpact.numerator, priceImpact.denominator)

    return this._priceImpact
  }

  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route The route of the exact in trade
   * @param amountIn The amount being passed in
   * @returns The exact in trade
   */
  public static async exactIn(route: ElixirRoute, amountIn: CurrencyAmount): Promise<ElixirTrade> {
    return ElixirTrade.fromRoute(route, amountIn, TradeType.EXACT_INPUT)
  }

  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route The route of the exact out trade
   * @param amountOut The amount returned by the trade
   * @returns The exact out trade
   */
  public static async exactOut(route: ElixirRoute, amountOut: CurrencyAmount): Promise<ElixirTrade> {
    return ElixirTrade.fromRoute(route, amountOut, TradeType.EXACT_OUTPUT)
  }

  /**
   * Constructs a trade by simulating swaps through the given route
   * @param route route to swap through
   * @param amount the amount specified, either input or output, depending on tradeType
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The route
   */
  public static async fromRoute(
    route: ElixirRoute,
    amount: CurrencyAmount,
    tradeType: TradeType
  ): Promise<ElixirTrade> {
    const amounts: TokenAmount[] = new Array(route.path.length)
    let inputAmount: CurrencyAmount
    let outputAmount: CurrencyAmount
    if (tradeType === TradeType.EXACT_INPUT) {
      invariant(currencyIsEqual(amount.currency, route.input), 'INPUT')
      amounts[0] = wrappedAmount(amount, route.chainId as ChainId)
      for (let i = 0; i < route.path.length - 1; i++) {
        const pool = route.pools[i]
        const [outputAmount] = await pool.getOutputAmount(amounts[i])
        amounts[i + 1] = outputAmount
      }
      inputAmount = createAmount(route.input, amount.raw, route.chainId)
      outputAmount = createAmount(route.output, amounts[amounts.length - 1].raw, route.chainId)
    } else {
      invariant(currencyIsEqual(amount.currency, route.output), 'OUTPUT')
      amounts[amounts.length - 1] = wrappedAmount(amount, route.chainId as ChainId)
      for (let i = route.path.length - 1; i > 0; i--) {
        const pool = route.pools[i - 1]
        const [inputAmount] = await pool.getInputAmount(amounts[i])
        amounts[i - 1] = inputAmount
      }
      inputAmount = createAmount(route.input, amounts[0].raw, route.chainId)
      outputAmount = createAmount(route.output, amount.raw, route.chainId)
    }

    return new ElixirTrade({
      routes: [{ inputAmount, outputAmount, route }],
      tradeType
    })
  }

  /**
   * Constructs a trade from routes by simulating swaps
   *
   * @param routes the routes to swap through and how much of the amount should be routed through each
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The trade
   */
  public static async fromRoutes(
    routes: {
      amount: CurrencyAmount
      route: ElixirRoute
    }[],
    tradeType: TradeType
  ): Promise<ElixirTrade> {
    const populatedRoutes: {
      route: ElixirRoute
      inputAmount: CurrencyAmount
      outputAmount: CurrencyAmount
    }[] = []

    for (const { route, amount } of routes) {
      const amounts: TokenAmount[] = new Array(route.path.length)
      let inputAmount: CurrencyAmount
      let outputAmount: CurrencyAmount

      if (tradeType === TradeType.EXACT_INPUT) {
        invariant(currencyIsEqual(amount.currency, route.input), 'INPUT')
        inputAmount = createAmount(route.input, amount.raw, route.chainId)
        amounts[0] = wrappedAmount(amount, route.chainId as ChainId)

        for (let i = 0; i < route.path.length - 1; i++) {
          const pool = route.pools[i]
          const [outputAmount] = await pool.getOutputAmount(amounts[i])
          amounts[i + 1] = outputAmount
        }

        outputAmount = createAmount(route.output, amounts[amounts.length - 1].raw, route.chainId)
      } else {
        invariant(currencyIsEqual(amount.currency, route.output), 'OUTPUT')
        outputAmount = createAmount(route.output, amount.raw, route.chainId)
        amounts[amounts.length - 1] = wrappedAmount(amount, route.chainId as ChainId)

        for (let i = route.path.length - 1; i > 0; i--) {
          const pool = route.pools[i - 1]
          const [inputAmount] = await pool.getInputAmount(amounts[i])
          amounts[i - 1] = inputAmount
        }

        inputAmount = createAmount(route.input, amounts[0].raw, route.chainId)
      }

      populatedRoutes.push({ route, inputAmount, outputAmount })
    }

    return new ElixirTrade({
      routes: populatedRoutes,
      tradeType
    })
  }

  /**
   * Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  public static createUncheckedTrade(constructorArguments: {
    route: ElixirRoute
    inputAmount: CurrencyAmount
    outputAmount: CurrencyAmount
    tradeType: TradeType
  }): ElixirTrade {
    return new ElixirTrade({
      ...constructorArguments,
      routes: [
        {
          inputAmount: constructorArguments.inputAmount,
          outputAmount: constructorArguments.outputAmount,
          route: constructorArguments.route
        }
      ]
    })
  }

  /**
   * Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  public static createUncheckedTradeWithMultipleRoutes(constructorArguments: {
    routes: {
      route: ElixirRoute
      inputAmount: CurrencyAmount
      outputAmount: CurrencyAmount
    }[]
    tradeType: TradeType
  }): ElixirTrade {
    return new ElixirTrade(constructorArguments)
  }

  /**
   * Construct a trade by passing in the pre-computed property values
   * @param routes The routes through which the trade occurs
   * @param tradeType The type of trade, exact input or exact output
   */
  private constructor({
    routes,
    tradeType
  }: {
    routes: {
      route: ElixirRoute
      inputAmount: CurrencyAmount
      outputAmount: CurrencyAmount
    }[]
    tradeType: TradeType
  }) {
    const chainId = routes[0].route.chainId as ChainId
    const inputCurrency = routes[0].inputAmount.currency
    const inputCurrencyWrapped = wrappedCurrency(inputCurrency, chainId)
    const outputCurrency = routes[0].outputAmount.currency
    const outputCurrencyWrapped = wrappedCurrency(outputCurrency, chainId)
    invariant(
      routes.every(({ route }) => route.chainId === chainId),
      'CHAIN_IDS'
    )
    invariant(
      routes.every(({ route }) => {
        return inputCurrencyWrapped.equals(wrappedCurrency(route.input, chainId))
      }),
      'INPUT_CURRENCY_MATCH'
    )
    invariant(
      routes.every(({ route }) => {
        return outputCurrencyWrapped.equals(wrappedCurrency(route.output, chainId))
      }),
      'OUTPUT_CURRENCY_MATCH'
    )

    const numPools = routes.map(({ route }) => route.pools.length).reduce((total, cur) => total + cur, 0)
    const poolAddressSet = new Set<string>()
    for (const { route } of routes) {
      for (const pool of route.pools) {
        poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee))
      }
    }

    invariant(numPools === poolAddressSet.size, 'POOLS_DUPLICATED')

    this.swaps = routes
    this.tradeType = tradeType
  }

  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  public minimumAmountOut(slippageTolerance: Percent, amountOut = this.outputAmount): CurrencyAmount {
    invariant(!slippageTolerance.lessThan(ZERO), 'SLIPPAGE_TOLERANCE')
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut
    } else {
      const slippageAdjustedAmountOut = new Fraction(ONE)
        .add(slippageTolerance)
        .invert()
        .multiply(amountOut.raw).quotient
      return createAmount(amountOut.currency, slippageAdjustedAmountOut, this.chainId)
    }
  }

  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */
  public maximumAmountIn(slippageTolerance: Percent, amountIn = this.inputAmount): CurrencyAmount {
    invariant(!slippageTolerance.lessThan(ZERO), 'SLIPPAGE_TOLERANCE')
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn
    } else {
      const slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.raw).quotient
      return createAmount(amountIn.currency, slippageAdjustedAmountIn, this.chainId)
    }
  }

  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */
  public worstExecutionPrice(slippageTolerance: Percent): Price {
    return new Price(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.maximumAmountIn(slippageTolerance).raw,
      this.minimumAmountOut(slippageTolerance).raw
    )
  }

  /**
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact in trade
   */
  public static async bestTradeExactIn(
    pools: Pool[],
    currencyAmountIn: CurrencyAmount,
    currencyOut: Currency,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {},
    // used in recursion.
    currentPools: Pool[] = [],
    nextAmountIn: CurrencyAmount = currencyAmountIn,
    bestTrades: ElixirTrade[] = []
  ): Promise<ElixirTrade[]> {
    invariant(pools.length > 0, 'POOLS')
    invariant(maxHops > 0, 'MAX_HOPS')
    invariant(currencyAmountIn === nextAmountIn || currentPools.length > 0, 'INVALID_RECURSION')

    const amountIn = wrappedAmount(nextAmountIn, pools[0].chainId as ChainId)
    const tokenIn = amountIn.token
    const tokenOut = wrappedCurrency(currencyOut, pools[0].chainId as ChainId)

    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i]
      // pool irrelevant
      if (!pool.involvesToken(tokenIn)) continue

      let amountOut: TokenAmount
      try {
        ;[amountOut] = await pool.getOutputAmount(amountIn)
      } catch (error) {
        // input too low
        // @ts-ignore
        if (error.isInsufficientInputAmountError) {
          continue
        }
        throw error
      }
      // we have arrived at the output token, so this is the final trade of one of the paths
      if (amountOut.token.equals(tokenOut)) {
        sortedInsert(
          bestTrades,
          await ElixirTrade.fromRoute(
            new ElixirRoute([...currentPools, pool], currencyAmountIn.currency, currencyOut),
            currencyAmountIn,
            TradeType.EXACT_INPUT
          ),
          maxNumResults,
          elixirTradeComparator
        )
      } else if (maxHops > 1 && pools.length > 1) {
        const poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length))

        // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops
        await ElixirTrade.bestTradeExactIn(
          poolsExcludingThisPool,
          currencyAmountIn,
          currencyOut,
          {
            maxNumResults,
            maxHops: maxHops - 1
          },
          [...currentPools, pool],
          amountOut,
          bestTrades
        )
      }
    }

    return bestTrades
  }

  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the desired currency amount out
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact out trade
   */
  public static async bestTradeExactOut(
    pools: Pool[],
    currencyIn: Currency,
    currencyAmountOut: CurrencyAmount,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {},
    // used in recursion.
    currentPools: Pool[] = [],
    nextAmountOut: CurrencyAmount = currencyAmountOut,
    bestTrades: ElixirTrade[] = []
  ): Promise<ElixirTrade[]> {
    invariant(pools.length > 0, 'POOLS')
    invariant(maxHops > 0, 'MAX_HOPS')
    invariant(currencyAmountOut === nextAmountOut || currentPools.length > 0, 'INVALID_RECURSION')

    const amountOutWrapped = wrappedAmount(nextAmountOut, pools[0].chainId as ChainId)
    const tokenInWrapped = wrappedCurrency(currencyIn, pools[0].chainId as ChainId)

    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i]
      // pool irrelevant
      if (!pool.token0.equals(amountOutWrapped.token) && !pool.token1.equals(amountOutWrapped.token)) continue

      let amountIn: TokenAmount
      try {
        ;[amountIn] = await pool.getInputAmount(amountOutWrapped)
      } catch (error) {
        // not enough liquidity in this pool
        // @ts-ignore
        if (error.isInsufficientReservesError) {
          continue
        }
        throw error
      }
      // we have arrived at the input token, so this is the first trade of one of the paths
      if (amountIn.token.equals(tokenInWrapped)) {
        sortedInsert(
          bestTrades,
          await ElixirTrade.fromRoute(
            new ElixirRoute([pool, ...currentPools], currencyIn, currencyAmountOut.currency),
            currencyAmountOut,
            TradeType.EXACT_OUTPUT
          ),
          maxNumResults,
          elixirTradeComparator
        )
      } else if (maxHops > 1 && pools.length > 1) {
        const poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length))

        // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops
        await ElixirTrade.bestTradeExactOut(
          poolsExcludingThisPool,
          currencyIn,
          currencyAmountOut,
          {
            maxNumResults,
            maxHops: maxHops - 1
          },
          [pool, ...currentPools],
          amountIn,
          bestTrades
        )
      }
    }

    return bestTrades
  }
}
