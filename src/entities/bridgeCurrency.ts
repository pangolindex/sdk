import { ChainId } from 'chains'
import { CAVAX, Currency } from './currency'

/**
 * A currency is any fungible financial instrument on any blockchain.
 *
 */
export class BridgeCurrency extends Currency {
  public readonly chainId: string
  public readonly address: string
  public readonly logo?: string

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param chainId chainId of the currency
   * @param address of the currency
   * @param logo of the currency
   * @param decimals of the currency
   * @param symbol of the currency
   * @param name of the currency
   */
  protected constructor(
    address: string,
    chainId: string,
    decimals: number,
    logo?: string,
    symbol?: string,
    name?: string
  ) {
    super(decimals, symbol, name)

    this.address = address
    this.chainId = chainId
    this.logo = logo
  }

  public equals(other: BridgeCurrency): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return other.chainId === this.chainId && other.address === this.address
  }

  public isNative(chainId: ChainId): boolean {
    const nativeCurrency = CAVAX[chainId]
    if (!nativeCurrency) return false
    return (
      nativeCurrency.decimals === this.decimals &&
      nativeCurrency.symbol === this.symbol &&
      nativeCurrency.name === this.name
    )
  }
}
