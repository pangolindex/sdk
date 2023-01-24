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
    [ChainId.FLARE_MAINNET]: new Currency(18, CHAINS[ChainId.FLARE_MAINNET].symbol, CHAINS[ChainId.FLARE_MAINNET].name),
    [ChainId.NEAR_MAINNET]: new Currency(24, CHAINS[ChainId.NEAR_MAINNET].symbol, CHAINS[ChainId.NEAR_MAINNET].name),
    [ChainId.NEAR_TESTNET]: new Currency(24, CHAINS[ChainId.NEAR_TESTNET].symbol, CHAINS[ChainId.NEAR_TESTNET].name),
    [ChainId.HEDERA_TESTNET]: new Currency(
      CHAINS[ChainId.HEDERA_TESTNET].nativeCurrency.decimals,
      CHAINS[ChainId.HEDERA_TESTNET].symbol,
      CHAINS[ChainId.HEDERA_TESTNET].name
    ),
    [ChainId.HEDERA_MAINNET]: new Currency(
      CHAINS[ChainId.HEDERA_MAINNET].nativeCurrency.decimals,
      CHAINS[ChainId.HEDERA_MAINNET].symbol,
      CHAINS[ChainId.HEDERA_MAINNET].name
    ),
    [ChainId.ETHEREUM]: new Currency(18, CHAINS[ChainId.ETHEREUM].symbol, CHAINS[ChainId.ETHEREUM].name),
    [ChainId.POLYGON]: new Currency(18, CHAINS[ChainId.POLYGON].symbol, CHAINS[ChainId.POLYGON].name),
    [ChainId.FANTOM]: new Currency(18, CHAINS[ChainId.FANTOM].symbol, CHAINS[ChainId.FANTOM].name),
    [ChainId.XDAI]: new Currency(18, CHAINS[ChainId.XDAI].symbol, CHAINS[ChainId.XDAI].name),
    [ChainId.BSC]: new Currency(18, CHAINS[ChainId.BSC].symbol, CHAINS[ChainId.BSC].name),
    [ChainId.ARBITRUM]: new Currency(18, CHAINS[ChainId.ARBITRUM].symbol, CHAINS[ChainId.ARBITRUM].name),
    [ChainId.CELO]: new Currency(18, CHAINS[ChainId.CELO].symbol, CHAINS[ChainId.CELO].name),
    [ChainId.OKXCHAIN]: new Currency(18, CHAINS[ChainId.OKXCHAIN].symbol, CHAINS[ChainId.OKXCHAIN].name),
    [ChainId.VELAS]: new Currency(18, CHAINS[ChainId.VELAS].symbol, CHAINS[ChainId.VELAS].name),
    [ChainId.AURORA]: new Currency(18, CHAINS[ChainId.AURORA].symbol, CHAINS[ChainId.AURORA].name),
    [ChainId.CRONOS]: new Currency(18, CHAINS[ChainId.CRONOS].symbol, CHAINS[ChainId.CRONOS].name),
    [ChainId.FUSE]: new Currency(18, CHAINS[ChainId.FUSE].symbol, CHAINS[ChainId.FUSE].name),
    [ChainId.MOONRIVER]: new Currency(18, CHAINS[ChainId.MOONRIVER].symbol, CHAINS[ChainId.MOONRIVER].name),
    [ChainId.MOONBEAM]: new Currency(18, CHAINS[ChainId.MOONBEAM].symbol, CHAINS[ChainId.MOONBEAM].name),
    [ChainId.OP]: new Currency(18, CHAINS[ChainId.OP].symbol, CHAINS[ChainId.OP].name),
    [ChainId.COSTON2]: new Currency(18, CHAINS[ChainId.COSTON2].symbol, CHAINS[ChainId.COSTON2].name),
    [ChainId.EVMOS_TESTNET]: new Currency(18, CHAINS[ChainId.EVMOS_TESTNET].symbol, CHAINS[ChainId.EVMOS_TESTNET].name)
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
