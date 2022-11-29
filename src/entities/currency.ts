import JSBI from 'jsbi'
import { ChainId } from '..'
import { SolidityType } from '../constants'
import { validateSolidityTypeInstance } from '../utils'
import { CHAINS } from '../chains'

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

  public static readonly CURRENCY: { [chainId in ChainId]: Currency } = {
    [ChainId.FUJI]: new Currency(18, CHAINS[ChainId.FUJI].symbol, CHAINS[ChainId.FUJI].name),
    [ChainId.AVALANCHE]: new Currency(18, CHAINS[ChainId.AVALANCHE].symbol, CHAINS[ChainId.AVALANCHE].name),
    [ChainId.WAGMI]: new Currency(18, CHAINS[ChainId.WAGMI].symbol, CHAINS[ChainId.WAGMI].name),
    [ChainId.COSTON]: new Currency(18, CHAINS[ChainId.COSTON].symbol, CHAINS[ChainId.COSTON].name),
    [ChainId.SONGBIRD]: new Currency(18, CHAINS[ChainId.SONGBIRD].symbol, CHAINS[ChainId.SONGBIRD].name),
    [ChainId.NEAR_MAINNET]: new Currency(24, CHAINS[ChainId.NEAR_MAINNET].symbol, CHAINS[ChainId.NEAR_MAINNET].name),
    [ChainId.NEAR_TESTNET]: new Currency(24, CHAINS[ChainId.NEAR_TESTNET].symbol, CHAINS[ChainId.NEAR_TESTNET].name),
    [ChainId.HEDERA_TESTNET]: new Currency(
      CHAINS[ChainId.HEDERA_TESTNET].nativeCurrency.decimals,
      CHAINS[ChainId.HEDERA_TESTNET].symbol,
      CHAINS[ChainId.HEDERA_TESTNET].name
    ),
    [ChainId.EVMOS_TESTNET]: new Currency(18, CHAINS[ChainId.EVMOS_TESTNET].symbol, CHAINS[ChainId.EVMOS_TESTNET].name),
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
