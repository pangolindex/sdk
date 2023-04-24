import invariant from 'tiny-invariant'
import { ChainId } from '../../chains'
import { Currency, CAVAX, Token, WAVAX } from '../../entities'

export function wrappedCurrency(currency: Currency, chainId: ChainId): Token {
  if (currency instanceof Token) return currency
  if (CAVAX[chainId].equals(currency)) return WAVAX[chainId]
  invariant(false, 'CURRENCY')
}
