import invariant from 'tiny-invariant'
import { ChainId } from '../../chains'
import { CurrencyAmount, CAVAX, WAVAX, TokenAmount, Token, Currency } from '../../entities'
import { BigintIsh } from '../../constants'

export function wrappedAmount(currencyAmount: CurrencyAmount, chainId: ChainId): TokenAmount {
  if (currencyAmount instanceof TokenAmount) return currencyAmount
  if (CAVAX[chainId].equals(currencyAmount.currency)) return new TokenAmount(WAVAX[chainId], currencyAmount.raw)
  invariant(false, 'CURRENCY')
}

export function createAmount(currency: Currency, rawAmount: BigintIsh, chainId: ChainId): CurrencyAmount {
  if (currency.isNative(chainId)) return CurrencyAmount.fromRawAmount(currency, rawAmount)
  if (currency instanceof Token) return TokenAmount.fromRawAmount(currency, rawAmount)
  invariant(false, 'CURRENCY')
}
