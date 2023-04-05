import JSBI from 'jsbi'
import invariant from 'tiny-invariant'

import { BigintIsh, Rounding } from '../../constants'
import { Fraction } from './fraction'
import { CurrencyAmountConcLiq } from './currencyAmountConcLiq'
import { Token } from 'entities'

export class PriceConcLiq<TBase extends Token, TQuote extends Token> extends Fraction {
  public readonly baseCurrency: TBase // input i.e. denominator
  public readonly quoteCurrency: TQuote // output i.e. numerator
  public readonly scalar: Fraction // used to adjust the raw fraction w/r/t the decimals of the {base,quote}Token

  /**
   * Construct a price, either with the base and quote currency amount, or the
   * @param args
   */
  public constructor(
    ...args:
      | [TBase, TQuote, BigintIsh, BigintIsh]
      | [{ baseAmount: CurrencyAmountConcLiq<TBase>; quoteAmount: CurrencyAmountConcLiq<TQuote> }]
  ) {
    let baseCurrency: TBase, quoteCurrency: TQuote, denominator: BigintIsh, numerator: BigintIsh

    if (args.length === 4) {
      ;[baseCurrency, quoteCurrency, denominator, numerator] = args
    } else {
      const result = args[0].quoteAmount.divide(args[0].baseAmount)
      ;[baseCurrency, quoteCurrency, denominator, numerator] = [
        args[0].baseAmount.currency,
        args[0].quoteAmount.currency,
        result.denominator,
        result.numerator
      ]
    }
    super(numerator, denominator)

    this.baseCurrency = baseCurrency
    this.quoteCurrency = quoteCurrency
    this.scalar = new Fraction(
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(baseCurrency.decimals)),
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(quoteCurrency.decimals))
    )
  }

  /**
   * Flip the price, switching the base and quote currency
   */
  public invert(): PriceConcLiq<TQuote, TBase> {
    return new PriceConcLiq(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator)
  }

  /**
   * Multiply the price by another price, returning a new price. The other price must have the same base currency as this price's quote currency
   * @param other the other price
   */
  public multiply<TOtherQuote extends Token>(other: PriceConcLiq<TQuote, TOtherQuote>): PriceConcLiq<TBase, TOtherQuote> {
    invariant(this.quoteCurrency.equals(other.baseCurrency), 'TOKEN')
    const fraction = super.multiply(other)
    return new PriceConcLiq(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator)
  }

  /**
   * Return the amount of quote currency corresponding to a given amount of the base currency
   * @param currencyAmount the amount of base currency to quote against the price
   */
  public quote(currencyAmount: CurrencyAmountConcLiq<TBase>): CurrencyAmountConcLiq<TQuote> {
    invariant(currencyAmount.currency.equals(this.baseCurrency), 'TOKEN')
    const result = super.multiply(currencyAmount)
    return CurrencyAmountConcLiq.fromFractionalAmount(this.quoteCurrency, result.numerator, result.denominator)
  }

  /**
   * Get the value scaled by decimals for formatting
   * @private
   */
  private get adjustedForDecimals(): Fraction {
    return super.multiply(this.scalar)
  }

  public toSignificant(significantDigits: number = 6, format?: object, rounding?: Rounding): string {
    return this.adjustedForDecimals.toSignificant(significantDigits, format, rounding)
  }

  public toFixed(decimalPlaces: number = 4, format?: object, rounding?: Rounding): string {
    return this.adjustedForDecimals.toFixed(decimalPlaces, format, rounding)
  }
}