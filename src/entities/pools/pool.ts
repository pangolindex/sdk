import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import { Token } from '../token'
import { ChainId } from '../../chains'
import { Price, TokenAmount } from '../fractions'

export abstract class Pool {
  public readonly chainId: ChainId
  public readonly liquidityToken: Token

  protected readonly tokenAmounts: TokenAmount[]

  protected constructor(chainId: ChainId, liquidityToken: Token, tokenAmounts: TokenAmount[]) {
    this.chainId = chainId
    this.liquidityToken = liquidityToken
    this.tokenAmounts = tokenAmounts
  }

  // Tokens

  get tokenCount(): number {
    return this.tokenAmounts.length
  }

  get tokens(): Token[] {
    return this.tokenAmounts.map((tokenAmount: TokenAmount) => tokenAmount.token)
  }

  involvesToken(token: Token): boolean {
    return this.tokenAmounts.some((tokenAmount: TokenAmount) => tokenAmount.token.equals(token))
  }

  token(index: number): Token {
    return this.tokenAmounts[index].token
  }

  // Reserves

  get reserves(): TokenAmount[] {
    return this.tokenAmounts
  }

  reserveOfIndex(index: number): TokenAmount {
    return this.tokenAmounts[index]
  }

  reserveOfToken(token: Token): TokenAmount {
    const index = this.tokens.indexOf(token)
    invariant(index >= 0, 'TOKEN_MISSING')
    return this.tokenAmounts[index]
  }

  // Prices

  priceOf(baseToken: Token, quoteToken: Token): Price {
    return new Price(baseToken, quoteToken, this.reserveOfToken(baseToken).raw, this.reserveOfToken(quoteToken).raw)
  }

  // Swap

  abstract getOutputAmount(inputAmount: TokenAmount, outputToken: Token): [TokenAmount, Pool]

  abstract getInputAmount(outputAmount: TokenAmount, inputToken: Token): [TokenAmount, Pool]

  // Swap Fees

  abstract get swapFeeCoefficient(): JSBI

  abstract get swapFeeDivisor(): JSBI

  // Mint

  abstract getLiquidityMinted(totalSupply: TokenAmount, depositTokenAmounts: TokenAmount[]): TokenAmount

  // Burn

  abstract getLiquidityValues(totalSupply: TokenAmount, shares: TokenAmount, options?: object): TokenAmount[]
}
