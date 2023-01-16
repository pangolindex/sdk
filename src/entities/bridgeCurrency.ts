import { Currency } from './currency'

/**
 * A currency is any fungible financial instrument on any blockchain.
 *
 */
export class BridgeCurrency extends Currency {
  public readonly chainId: string
  public readonly address: string
  public readonly logo?: string
  public readonly reserveAmount?: string
  public bridgeableNetworks?: BridgeCurrency[]

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param chainId chainId of the currency
   * @param address of the currency
   * @param logo of the currency
   * @param decimals of the currency
   * @param symbol of the currency
   * @param name of the currency
   * @param reverseAmount of the currency (Valid only Hashport Bridge)
   * @param bridgeableNetworks of the currency (Valid only Hashport Bridge)
   */
  protected constructor(
    address: string,
    chainId: string,
    decimals: number,
    logo?: string,
    symbol?: string,
    name?: string,
    reverseAmount?: string,
    bridgeableNetworks?: BridgeCurrency[],
  ) {
    super(decimals, symbol, name)

    this.address = address
    this.chainId = chainId
    this.logo = logo
    this.reserveAmount = reverseAmount
    this.bridgeableNetworks = bridgeableNetworks
  }
}
