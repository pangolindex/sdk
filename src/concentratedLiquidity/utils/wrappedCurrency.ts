import invariant from 'tiny-invariant'
import { ChainId } from '../../chains'
import { Currency, CAVAX, Token, WAVAX } from '../../entities'
import { currencyIsEqual } from '../utils/currencyHelper'

export function wrappedCurrency(currency: Currency, chainId: ChainId): Token {
  if (currency instanceof Token) return currency
  if (currencyIsEqual(currency, CAVAX[chainId])) return WAVAX[chainId]
  invariant(false, 'CURRENCY')
}
