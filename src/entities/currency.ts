import JSBI from 'jsbi'
import { ChainId } from '..'
import { SolidityType } from '../constants'
import { validateSolidityTypeInstance } from '../utils'

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  /**
   * The only instance of the base class `Currency`.
   */

  //$ public static readonly CAVAX: Currency = new Currency(18, 'AVAX', 'Avalanche')

  public static readonly CURRENCY = {
    [ChainId.FUJI]: new Currency(18, 'AVAX', 'Avalanche'),
    [ChainId.AVALANCHE]: new Currency(18, 'AVAX', 'Avalanche'),
    [ChainId.WAGMI]: new Currency(18, 'WGM', 'Wagmi'),
  }

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }
}

//$ const CAVAX = Currency.CAVAX
const CAVAX = Currency.CURRENCY
export { CAVAX }
