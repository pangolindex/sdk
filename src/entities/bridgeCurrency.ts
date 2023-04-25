import { Currency } from './currency'

/**
 * A BridgeCurrency is any fungible financial instrument on any blockchain.
 *
 */
export class BridgeCurrency extends Currency {
  public readonly chainId: string
  public readonly address: string
  public readonly logo?: string

  /**
   * @param chainId chainId of the currency
   * @param address of the currency
   * @param logo of the currency
   * @param decimals of the currency
   * @param symbol of the currency
   * @param name of the currency
   */
  public constructor(
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
}
