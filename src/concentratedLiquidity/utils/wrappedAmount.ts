import invariant from 'tiny-invariant'
import { ChainId } from '../../chains'
import { CurrencyAmount, CAVAX, WAVAX, TokenAmount } from '../../entities'

export function wrappedAmount(currencyAmount: CurrencyAmount, chainId: ChainId): TokenAmount {
  if (currencyAmount instanceof TokenAmount) return currencyAmount
  if (currencyAmount.currency === CAVAX[chainId]) return new TokenAmount(WAVAX[chainId], currencyAmount.raw)
  invariant(false, 'CURRENCY')
}
