import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import { Pool } from './pool'
import { Token } from '../token'
import { Price, TokenAmount } from '../fractions'
import { ChainId, CHAINS } from '../../chains'
import {
  BigintIsh,
  FACTORY_ADDRESS,
  INIT_CODE_HASH_MAPPING,
  MINIMUM_LIQUIDITY,
  ZERO,
  ONE,
  FIVE,
  _997,
  _998,
  _1000
} from '../../constants'
import { InsufficientReservesError, InsufficientInputAmountError } from '../../errors'
import { sqrt, parseBigintIsh } from '../../utils'

export class Pair extends Pool {
  public static getAddress(tokenA: Token, tokenB: Token, chainId: ChainId = ChainId.AVALANCHE): string {
    const tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks

    // we create custom lp address here
    // for evm we have method to create lp address
    // but for non-evm we don't have that method, so for now we are going to concatenate both token addresses
    return !!CHAINS[chainId]?.evm
      ? getCreate2Address(
          FACTORY_ADDRESS[chainId],
          keccak256(['bytes'], [pack(['address', 'address'], [tokens[0].address, tokens[1].address])]),
          INIT_CODE_HASH_MAPPING[chainId]
        )
      : `${tokens[0].address}-${tokens[1].address}`
  }

  public constructor(tokenAmountA: TokenAmount, tokenAmountB: TokenAmount, chainId: ChainId = ChainId.AVALANCHE) {
    const tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
      ? [tokenAmountA, tokenAmountB]
      : [tokenAmountB, tokenAmountA]

    let decimals: number
    if ([ChainId.NEAR_TESTNET, ChainId.NEAR_MAINNET].includes(chainId)) {
      decimals = 24
    } else if ([ChainId.HEDERA_TESTNET].includes(chainId)) {
      decimals = 0
    } else {
      decimals = 18
    }

    const liquidityToken = new Token(
      chainId,
      Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token, chainId),
      decimals,
      'PGL',
      'Pangolin Liquidity'
    )

    super(chainId, liquidityToken, tokenAmounts)
  }

  public get token0(): Token {
    return this.tokenAmounts[0].token
  }

  public get token1(): Token {
    return this.tokenAmounts[1].token
  }

  public get token0Price(): Price {
    return this.priceOf(this.token0, this.token1)
  }

  public get token1Price(): Price {
    return this.priceOf(this.token1, this.token0)
  }

  public get reserve0(): TokenAmount {
    return this.tokenAmounts[0]
  }

  public get reserve1(): TokenAmount {
    return this.tokenAmounts[1]
  }

  public get swapFeeCoefficient(): JSBI {
    switch (this.chainId) {
      case ChainId.NEAR_MAINNET:
      case ChainId.NEAR_TESTNET:
        return _998 // 0.2%
      default:
        return _997 // 0.3%
    }
  }

  public get swapFeeDivisor(): JSBI {
    switch (this.chainId) {
      default:
        return _1000
    }
  }

  public getOutputAmount(inputAmount: TokenAmount, outputToken: Token): [TokenAmount, Pair] {
    invariant(this.involvesToken(inputAmount.token) && this.involvesToken(outputToken), 'TOKEN')
    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError()
    }
    const inputReserve = this.reserveOfToken(inputAmount.token)
    const outputReserve = this.reserveOfToken(inputAmount.token.equals(this.token0) ? this.token1 : this.token0)
    const inputAmountWithFee = JSBI.multiply(inputAmount.raw, this.swapFeeCoefficient)
    const numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw)
    const denominator = JSBI.add(JSBI.multiply(inputReserve.raw, this.swapFeeDivisor), inputAmountWithFee)
    const outputAmount = new TokenAmount(
      inputAmount.token.equals(this.token0) ? this.token1 : this.token0,
      JSBI.divide(numerator, denominator)
    )
    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError()
    }
    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.chainId)]
  }

  public getInputAmount(outputAmount: TokenAmount, inputToken: Token): [TokenAmount, Pair] {
    invariant(this.involvesToken(outputAmount.token) && this.involvesToken(inputToken), 'TOKEN')
    if (
      JSBI.equal(this.reserve0.raw, ZERO) ||
      JSBI.equal(this.reserve1.raw, ZERO) ||
      JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOfToken(outputAmount.token).raw)
    ) {
      throw new InsufficientReservesError()
    }

    const outputReserve = this.reserveOfToken(outputAmount.token)
    const inputReserve = this.reserveOfToken(outputAmount.token.equals(this.token0) ? this.token1 : this.token0)
    const numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), this.swapFeeDivisor)
    const denominator = JSBI.multiply(JSBI.subtract(outputReserve.raw, outputAmount.raw), this.swapFeeCoefficient)
    const inputAmount = new TokenAmount(
      outputAmount.token.equals(this.token0) ? this.token1 : this.token0,
      JSBI.add(JSBI.divide(numerator, denominator), ONE)
    )
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.chainId)]
  }

  public getLiquidityMinted(totalSupply: TokenAmount, depositTokenAmounts: TokenAmount[]): TokenAmount {
    invariant(totalSupply.token.equals(this.liquidityToken), 'LIQUIDITY')
    invariant(depositTokenAmounts.length === 2, 'LIQUIDITY_TOKENS')
    const tokenAmounts = depositTokenAmounts[0].token.sortsBefore(depositTokenAmounts[1].token) // does safety checks
      ? [depositTokenAmounts[0], depositTokenAmounts[1]]
      : [depositTokenAmounts[1], depositTokenAmounts[0]]
    invariant(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1), 'TOKEN')

    let liquidity: JSBI
    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY)
    } else {
      const amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw)
      const amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw)
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1
    }
    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError()
    }
    return new TokenAmount(this.liquidityToken, liquidity)
  }

  public getLiquidityValues(
    totalSupply: TokenAmount,
    liquidity: TokenAmount,
    options?: {
      feeOn?: boolean
      kLast?: BigintIsh
    }
  ): TokenAmount[] {
    invariant(totalSupply.token.equals(this.liquidityToken), 'TOTAL_SUPPLY')
    invariant(liquidity.token.equals(this.liquidityToken), 'LIQUIDITY')
    invariant(JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw), 'LIQUIDITY')

    let totalSupplyAdjusted: TokenAmount
    if (!options?.feeOn) {
      totalSupplyAdjusted = totalSupply
    } else {
      invariant(!!options?.kLast, 'K_LAST')
      const kLastParsed = parseBigintIsh(options.kLast)
      if (!JSBI.equal(kLastParsed, ZERO)) {
        const rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw))
        const rootKLast = sqrt(kLastParsed)
        if (JSBI.greaterThan(rootK, rootKLast)) {
          const numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast))
          const denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast)
          const feeLiquidity = JSBI.divide(numerator, denominator)
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity))
        } else {
          totalSupplyAdjusted = totalSupply
        }
      } else {
        totalSupplyAdjusted = totalSupply
      }
    }

    return this.reserves.map(
      (reserve: TokenAmount) =>
        new TokenAmount(reserve.token, JSBI.divide(JSBI.multiply(liquidity.raw, reserve.raw), totalSupplyAdjusted.raw))
    )
  }
}
