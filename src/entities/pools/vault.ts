import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import { Pool } from './pool'
import { Token } from '../token'
import { ChainId } from '../../chains'
import { ZERO, TWO, TEN, ONE } from '../../constants'
import { InsufficientReservesError, InsufficientInputAmountError, MethodNotSupported } from '../../errors'
import { TokenAmount } from '../fractions'
import { abs } from '../../utils'

export const TARGET_DECIMAL = JSBI.BigInt(18)
export const MIN_RESERVE = JSBI.exponentiate(TEN, TARGET_DECIMAL)

export class Vault extends Pool {
  public readonly amp: JSBI

  static getAddress(tokens: Token[]): string {
    return tokens.map((token: Token) => token.address).join('-')
  }

  public constructor(tokenAmounts: TokenAmount[], amp: JSBI, chainId: ChainId = ChainId.NEAR_TESTNET) {
    invariant(JSBI.greaterThanOrEqual(amp, ONE) && JSBI.lessThanOrEqual(amp, JSBI.BigInt(1_000_000)), 'AMP_ILLEGAL')
    invariant(
      tokenAmounts.every(({ token }) => token.decimals >= 1 && token.decimals <= 24),
      'DECIMAL_ILLEGAL'
    )

    const liquidityToken = new Token(
      chainId,
      Vault.getAddress(tokenAmounts.map(tokenAmount => tokenAmount.token)),
      18,
      'PGL',
      'Pangolin Liquidity'
    )

    super(chainId, liquidityToken, tokenAmounts)

    this.amp = amp
  }

  public get reserves_c(): JSBI[] {
    return this.tokenAmounts.map((tokenAmount: TokenAmount) =>
      Vault.amount_to_c_amount(tokenAmount.raw, tokenAmount.token.decimals)
    )
  }

  public static amount_to_c_amount(amount: JSBI, decimals: number): JSBI {
    const decimalsBI = JSBI.BigInt(decimals)
    if (JSBI.lessThanOrEqual(decimalsBI, TARGET_DECIMAL)) {
      const factor = JSBI.exponentiate(TEN, JSBI.subtract(TARGET_DECIMAL, decimalsBI))
      return JSBI.multiply(amount, factor)
    } else {
      const factor = JSBI.exponentiate(TEN, JSBI.subtract(decimalsBI, TARGET_DECIMAL))
      return JSBI.divide(amount, factor)
    }
  }

  public static c_amount_to_amount(c_amount: JSBI, decimals: number): JSBI {
    const decimalsBI = JSBI.BigInt(decimals)
    if (JSBI.lessThanOrEqual(decimalsBI, TARGET_DECIMAL)) {
      const factor = JSBI.exponentiate(TEN, JSBI.subtract(TARGET_DECIMAL, decimalsBI))
      return JSBI.divide(c_amount, factor)
    } else {
      const factor = JSBI.exponentiate(TEN, JSBI.subtract(decimalsBI, TARGET_DECIMAL))
      return JSBI.multiply(c_amount, factor)
    }
  }

  /**
   * Returns the swap fee coefficient (x / DIVISOR) for swaps utilizing the vault.
   * Where (1 - (x/DIVISOR)) of each swap belongs to the LPs
   */
  public get swapFeeCoefficient(): JSBI {
    switch (this.chainId) {
      default:
        return JSBI.BigInt(9995) // 0.05%
    }
  }

  public get swapFeeDivisor(): JSBI {
    switch (this.chainId) {
      default:
        return JSBI.BigInt(10000)
    }
  }

  public getOutputAmount(inputAmount: TokenAmount, outputToken: Token): [TokenAmount, Vault] {
    const in_token_i = this.tokens.indexOf(inputAmount.token)
    const out_token_i = this.tokens.indexOf(outputToken)

    invariant(in_token_i >= 0 && in_token_i < this.tokenCount, 'TOKEN_IN_I')
    invariant(out_token_i >= 0 && out_token_i < this.tokenCount, 'TOKEN_OUT_I')

    if (this.reserveOfToken(outputToken).equalTo(ZERO)) {
      throw new InsufficientReservesError()
    }

    const c_amounts = this.reserves_c

    const y = this.calc_y(
      JSBI.BigInt(this.amp),
      JSBI.add(c_amounts[in_token_i], inputAmount.raw),
      c_amounts,
      in_token_i,
      out_token_i
    )
    const dy = JSBI.subtract(c_amounts[out_token_i], y)
    const outputAmountWithFee = Vault.c_amount_to_amount(
      JSBI.divide(JSBI.multiply(dy, this.swapFeeCoefficient), this.swapFeeDivisor),
      outputToken.decimals
    )

    if (JSBI.equal(outputAmountWithFee, ZERO)) {
      throw new InsufficientInputAmountError()
    }

    const newTokenAmounts = this.tokenAmounts
    newTokenAmounts[in_token_i] = newTokenAmounts[in_token_i].add(inputAmount)
    newTokenAmounts[out_token_i] = newTokenAmounts[out_token_i].subtract(
      new TokenAmount(outputToken, outputAmountWithFee)
    )

    const newOutputTokenReserve_c = Vault.amount_to_c_amount(newTokenAmounts[out_token_i].raw, outputToken.decimals)
    invariant(JSBI.greaterThanOrEqual(newOutputTokenReserve_c, MIN_RESERVE), 'MIN_RESERVE')

    return [new TokenAmount(outputToken, outputAmountWithFee), new Vault(newTokenAmounts, this.amp, this.chainId)]
  }

  public getInputAmount(_outputToken: TokenAmount, _inputToken: Token): [TokenAmount, Vault] {
    throw new MethodNotSupported()
  }

  // Depositing X tokens for ? liquidity shares
  public getLiquidityMinted(totalSupply: TokenAmount, depositTokenAmounts: TokenAmount[]): TokenAmount {
    invariant(totalSupply.token.equals(this.liquidityToken), 'LIQUIDITY')
    invariant(depositTokenAmounts.length <= this.tokenCount, 'LIQUIDITY_TOKENS')

    const deposit_c_amounts: JSBI[] = []
    for (let i = 0; i < this.tokenCount; i++) {
      const deposit = depositTokenAmounts[i]
      if (deposit) {
        invariant(this.involvesToken(deposit.token), 'LIQUIDITY_TOKENS')
        deposit_c_amounts[i] = Vault.amount_to_c_amount(deposit.raw, deposit.token.decimals)
      } else {
        deposit_c_amounts[i] = ZERO
      }
    }

    if (JSBI.equal(totalSupply.raw, ZERO)) {
      const d_0 = this.calc_d(this.amp, deposit_c_amounts)
      return new TokenAmount(this.liquidityToken, d_0)
    }

    const n = this.tokenCount
    const old_c_amounts = this.reserves_c
    const d_0 = this.calc_d(this.amp, old_c_amounts)
    let new_c_amounts = []
    for (let i = 0; i < n; i++) {
      new_c_amounts[i] = JSBI.add(old_c_amounts[i], deposit_c_amounts[i])
    }
    const d_1 = this.calc_d(this.amp, new_c_amounts)

    if (JSBI.lessThanOrEqual(d_1, d_0)) throw new Error(`D1 need less then or equal to D0.`)

    for (let i = 0; i < n; i++) {
      const ideal_balance = JSBI.divide(JSBI.multiply(old_c_amounts[i], d_1), d_0)
      const difference = abs(JSBI.subtract(ideal_balance, new_c_amounts[i]))
      const fee = this.normalized_trade_fee(n, difference)
      new_c_amounts[i] = JSBI.subtract(new_c_amounts[i], fee)
    }
    const d_2 = this.calc_d(this.amp, new_c_amounts)

    if (JSBI.lessThan(d_1, d_2)) throw new Error(`D2 need less then D1.`)
    if (JSBI.lessThanOrEqual(d_2, d_0)) throw new Error(`D1 need less then or equal to D0.`)

    const mint_shares = JSBI.divide(JSBI.multiply(totalSupply.raw, JSBI.subtract(d_2, d_0)), d_0)

    return new TokenAmount(this.liquidityToken, mint_shares)
  }

  // Redeeming X liquidity shares for ? (all) tokens
  public getLiquidityValues(totalSupply: TokenAmount, shares: TokenAmount): TokenAmount[] {
    invariant(totalSupply.token.equals(this.liquidityToken), 'TOTAL_SUPPLY')
    invariant(shares.token.equals(this.liquidityToken), 'LIQUIDITY')
    invariant(JSBI.lessThanOrEqual(shares.raw, totalSupply.raw), 'LIQUIDITY')

    const liquidityTokenValues = []
    const c_amounts = this.reserves_c

    for (let i = 0; i < this.tokenCount; i++) {
      const amount = JSBI.equal(totalSupply.raw, ZERO)
        ? ZERO
        : JSBI.divide(JSBI.multiply(this.tokenAmounts[i].raw, shares.raw), totalSupply.raw)
      const amount_c = Vault.amount_to_c_amount(amount, this.tokenAmounts[i].token.decimals)
      const remaining_amount_c = JSBI.subtract(c_amounts[i], amount_c)
      invariant(JSBI.greaterThanOrEqual(remaining_amount_c, MIN_RESERVE), 'MIN_RESERVE')
      liquidityTokenValues[i] = new TokenAmount(this.tokenAmounts[i].token, amount)
    }

    return liquidityTokenValues
  }

  // Withdrawing X tokens in exchange for ? liquidity shares
  public getLiquidityValuesByTokens(totalSupply: TokenAmount, withdrawTokenAmounts: TokenAmount[]): TokenAmount {
    invariant(totalSupply.token.equals(this.liquidityToken), 'LIQUIDITY')
    invariant(withdrawTokenAmounts.length <= this.tokenCount, 'LIQUIDITY_TOKENS')

    const removed_c_amounts: JSBI[] = []
    for (let i = 0; i < this.tokenCount; i++) {
      const withdrawal = withdrawTokenAmounts[i]
      if (withdrawal) {
        invariant(this.involvesToken(withdrawal.token), 'LIQUIDITY_TOKENS')
        removed_c_amounts[i] = Vault.amount_to_c_amount(withdrawal.raw, withdrawal.token.decimals)
      } else {
        removed_c_amounts[i] = ZERO
      }
    }

    const old_c_amounts = this.reserves_c
    const pool_token_supply = totalSupply

    const token_num = old_c_amounts.length
    const d_0 = this.calc_d(this.amp, old_c_amounts)
    let c_amounts = []
    for (let i = 0; i < old_c_amounts.length; i++) {
      c_amounts[i] = JSBI.subtract(old_c_amounts[i], removed_c_amounts[i])
      invariant(JSBI.greaterThanOrEqual(c_amounts[i], MIN_RESERVE), 'MIN_RESERVE')
    }
    const d_1 = this.calc_d(this.amp, c_amounts)
    if (d_1 >= d_0) throw new Error(`D1 need less then or equal to D0.`)
    for (let i = 0; i < token_num; i++) {
      const ideal_balance = JSBI.divide(JSBI.multiply(old_c_amounts[i], d_1), d_0)
      const difference = abs(JSBI.subtract(ideal_balance, c_amounts[i]))
      const fee = this.normalized_trade_fee(token_num, difference)
      c_amounts[i] = JSBI.subtract(c_amounts[i], fee)
    }
    const d_2 = this.calc_d(this.amp, c_amounts)
    if (d_2 > d_1) throw new Error(`D2 need less then D1.`)
    if (d_1 >= d_0) throw new Error(`D1 need less then or equal to D0.`)
    const burn_shares = JSBI.divide(JSBI.multiply(pool_token_supply.raw, JSBI.subtract(d_0, d_2)), d_0)

    return new TokenAmount(this.liquidityToken, burn_shares)
  }

  private calc_y(amp: JSBI, x_c_amount: JSBI, c_amounts: JSBI[], in_token_i: number, out_token_i: number): JSBI {
    const n = c_amounts.length
    const n_jsbi = JSBI.BigInt(n)
    const nn = JSBI.exponentiate(n_jsbi, n_jsbi)
    const ann = JSBI.multiply(amp, nn)
    const d = this.calc_d(amp, c_amounts)
    let s = x_c_amount
    let c = JSBI.divide(JSBI.multiply(d, d), x_c_amount)
    for (let i = 0; i < n; i++) {
      if (i !== in_token_i && i !== out_token_i) {
        s = JSBI.add(s, c_amounts[i])
        c = JSBI.divide(JSBI.multiply(c, d), c_amounts[i])
      }
    }
    c = JSBI.divide(JSBI.multiply(c, d), JSBI.multiply(ann, nn))
    const b = JSBI.add(JSBI.divide(d, ann), s)
    let y_prev = ZERO
    let y = d
    for (let i = 0; i < 256; i++) {
      y_prev = y
      const y_numerator = JSBI.add(JSBI.exponentiate(y, TWO), c)
      const y_denominator = JSBI.subtract(JSBI.add(JSBI.multiply(y, TWO), b), d)
      y = JSBI.divide(y_numerator, y_denominator)
      if (JSBI.lessThanOrEqual(abs(JSBI.subtract(y, y_prev)), ONE)) break
    }
    return y
  }

  private calc_d(amp: JSBI, c_amounts: JSBI[]): JSBI {
    const n = c_amounts.length
    const n_jsbi = JSBI.BigInt(n)
    const nn = JSBI.exponentiate(n_jsbi, n_jsbi)
    let sum_amounts = ZERO
    for (const current_amount of c_amounts) {
      sum_amounts = JSBI.add(sum_amounts, current_amount)
    }
    let d_prev = ZERO
    let d = sum_amounts
    for (let i = 0; i < 256; i++) {
      let d_prod = d
      for (let current_amount of c_amounts) {
        d_prod = JSBI.divide(JSBI.multiply(d_prod, d), JSBI.multiply(current_amount, n_jsbi))
      }
      d_prev = d
      const ann = JSBI.multiply(amp, nn)
      const numerator = JSBI.multiply(d_prev, JSBI.add(JSBI.multiply(d_prod, n_jsbi), JSBI.multiply(ann, sum_amounts)))
      const denominator = JSBI.add(
        JSBI.multiply(d_prev, JSBI.subtract(ann, ONE)),
        JSBI.multiply(d_prod, JSBI.add(n_jsbi, ONE))
      )
      d = JSBI.divide(numerator, denominator)
      if (JSBI.lessThanOrEqual(abs(JSBI.subtract(d, d_prev)), ONE)) break
    }
    return d
  }

  private normalized_trade_fee(n: number, amount: JSBI): JSBI {
    const trade_fee = JSBI.toNumber(JSBI.subtract(this.swapFeeDivisor, this.swapFeeCoefficient))
    const adjusted_trade_fee = JSBI.BigInt(Math.floor((trade_fee * n) / (4 * (n - 1))))
    return JSBI.divide(JSBI.multiply(amount, adjusted_trade_fee), this.swapFeeDivisor)
  }
}
