import { ChainId } from '../../chains'
import { CAVAX, Currency } from '../../entities'

export function currencyIsEqual(a: Currency, b: Currency): boolean {
  if (a === b) return true
  return a.decimals === b.decimals && a.symbol === b.symbol && a.name === b.name
}

export function currencyIsNative(currency: Currency, chainId: ChainId): boolean {
  const nativeCurrency = CAVAX[chainId]
  if (currency === nativeCurrency) return true
  return (
    nativeCurrency.decimals === currency.decimals &&
    nativeCurrency.symbol === currency.symbol &&
    nativeCurrency.name === currency.name
  )
}
