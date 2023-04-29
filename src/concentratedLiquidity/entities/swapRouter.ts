import { Interface } from '@ethersproject/abi'
import invariant from 'tiny-invariant'
import { ZERO_ADDRESS, BigintIsh, TradeType } from '../../constants'
import { PermitOptions, SelfPermit } from './selfPermit'
import { createAmount, currencyIsNative, encodeRouteToPath, wrappedCurrency } from '../utils'
import { validateAndParseAddress } from '../../utils'
import { MethodParameters, toHex } from '../utils/calldata'
import ISwapRouter from '../../abis/concentratedLiquidity/ISwapRouter.json'
import { Multicall } from './multicall'
import { FeeOptions, Payments } from './payments'
import { ConcentratedTrade } from './index'
import { Percent, CurrencyAmount } from '../../entities'
import { ChainId } from '../../chains'

/**
 * Options for producing the arguments to send calls to the router.
 */
export interface SwapOptions {
  /**
   * How much the execution price is allowed to move unfavorably from the trade execution price.
   */
  slippageTolerance: Percent

  /**
   * The account that should receive the output.
   */
  recipient: string

  /**
   * When the transaction expires, in epoch seconds.
   */
  deadline: BigintIsh

  /**
   * The optional permit parameters for spending the input.
   */
  inputTokenPermit?: PermitOptions

  /**
   * The optional price limit for the trade.
   */
  sqrtPriceLimitX96?: BigintIsh

  /**
   * Optional information for taking a fee on output.
   */
  fee?: FeeOptions
}

/**
 * Represents the Uniswap V3 SwapRouter, and has static methods for helping execute trades.
 */
export abstract class SwapRouter {
  public static INTERFACE: Interface = new Interface(ISwapRouter.abi)

  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  public static swapCallParameters(
    trades: ConcentratedTrade | ConcentratedTrade[],
    options: SwapOptions
  ): MethodParameters {
    if (!Array.isArray(trades)) {
      trades = [trades]
    }

    const sampleTrade = trades[0]
    const sampleChainId = sampleTrade.chainId as ChainId
    const tokenIn = wrappedCurrency(sampleTrade.inputAmount.currency, sampleTrade.chainId)
    const tokenOut = wrappedCurrency(sampleTrade.outputAmount.currency, sampleTrade.chainId)

    // All trades should have the same starting and ending token.
    invariant(
      trades.every(trade => wrappedCurrency(trade.inputAmount.currency, trade.chainId).equals(tokenIn)),
      'TOKEN_IN_DIFF'
    )
    invariant(
      trades.every(trade => wrappedCurrency(trade.outputAmount.currency, trade.chainId).equals(tokenOut)),
      'TOKEN_OUT_DIFF'
    )

    const calldatas: string[] = []

    const ZERO_IN: CurrencyAmount = createAmount(trades[0].inputAmount.currency, 0, sampleChainId)
    const ZERO_OUT: CurrencyAmount = createAmount(trades[0].outputAmount.currency, 0, sampleChainId)

    const totalAmountOut: CurrencyAmount = trades.reduce(
      (sum, trade) => sum.add(trade.minimumAmountOut(options.slippageTolerance)),
      ZERO_OUT
    )

    // flag for whether a refund needs to happen
    const mustRefund =
      currencyIsNative(sampleTrade.inputAmount.currency, sampleChainId) &&
      sampleTrade.tradeType === TradeType.EXACT_OUTPUT
    const inputIsNative = currencyIsNative(sampleTrade.inputAmount.currency, sampleChainId)
    // flags for whether funds should be sent first to the router
    const outputIsNative = currencyIsNative(sampleTrade.outputAmount.currency, sampleChainId)
    const routerMustCustody = outputIsNative || !!options.fee

    const totalValue: CurrencyAmount = inputIsNative
      ? trades.reduce((sum, trade) => sum.add(trade.maximumAmountIn(options.slippageTolerance)), ZERO_IN)
      : ZERO_IN

    // encode permit if necessary
    if (options.inputTokenPermit) {
      invariant(!currencyIsNative(sampleTrade.inputAmount.currency, sampleChainId), 'NON_TOKEN_PERMIT')
      calldatas.push(
        SelfPermit.encodePermit(
          wrappedCurrency(sampleTrade.inputAmount.currency, sampleTrade.chainId),
          options.inputTokenPermit
        )
      )
    }

    const recipient: string = validateAndParseAddress(options.recipient)
    const deadline = toHex(options.deadline)

    for (const trade of trades) {
      for (const { route, inputAmount, outputAmount } of trade.swaps) {
        const amountIn: string = toHex(trade.maximumAmountIn(options.slippageTolerance, inputAmount).raw)
        const amountOut: string = toHex(trade.minimumAmountOut(options.slippageTolerance, outputAmount).raw)

        // flag for whether the trade is single hop or not
        const singleHop = route.pools.length === 1

        if (singleHop) {
          if (trade.tradeType === TradeType.EXACT_INPUT) {
            const exactInputSingleParams = {
              tokenIn: route.path[0].address,
              tokenOut: route.path[1].address,
              fee: route.pools[0].fee,
              recipient: routerMustCustody ? ZERO_ADDRESS : recipient,
              deadline,
              amountIn,
              amountOutMinimum: amountOut,
              sqrtPriceLimitX96: toHex(options.sqrtPriceLimitX96 ?? 0)
            }

            calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactInputSingle', [exactInputSingleParams]))
          } else {
            const exactOutputSingleParams = {
              tokenIn: route.path[0].address,
              tokenOut: route.path[1].address,
              fee: route.pools[0].fee,
              recipient: routerMustCustody ? ZERO_ADDRESS : recipient,
              deadline,
              amountOut,
              amountInMaximum: amountIn,
              sqrtPriceLimitX96: toHex(options.sqrtPriceLimitX96 ?? 0)
            }

            calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactOutputSingle', [exactOutputSingleParams]))
          }
        } else {
          invariant(options.sqrtPriceLimitX96 === undefined, 'MULTIHOP_PRICE_LIMIT')

          const path: string = encodeRouteToPath(route, trade.tradeType === TradeType.EXACT_OUTPUT)

          if (trade.tradeType === TradeType.EXACT_INPUT) {
            const exactInputParams = {
              path,
              recipient: routerMustCustody ? ZERO_ADDRESS : recipient,
              deadline,
              amountIn,
              amountOutMinimum: amountOut
            }

            calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactInput', [exactInputParams]))
          } else {
            const exactOutputParams = {
              path,
              recipient: routerMustCustody ? ZERO_ADDRESS : recipient,
              deadline,
              amountOut,
              amountInMaximum: amountIn
            }

            calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactOutput', [exactOutputParams]))
          }
        }
      }
    }

    // unwrap
    if (routerMustCustody) {
      if (!!options.fee) {
        if (outputIsNative) {
          calldatas.push(Payments.encodeUnwrapWETH9(totalAmountOut.raw, recipient, options.fee))
        } else {
          calldatas.push(
            Payments.encodeSweepToken(
              wrappedCurrency(sampleTrade.outputAmount.currency, sampleTrade.chainId),
              totalAmountOut.raw,
              recipient,
              options.fee
            )
          )
        }
      } else {
        calldatas.push(Payments.encodeUnwrapWETH9(totalAmountOut.raw, recipient))
      }
    }

    // refund
    if (mustRefund) {
      calldatas.push(Payments.encodeRefundETH())
    }

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(totalValue.raw)
    }
  }
}
