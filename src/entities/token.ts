import invariant from 'tiny-invariant'
import { ChainId } from '../chains'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'
import { CHAINS } from '../chains'
import { ZERO_ADDRESS } from '../constants'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId = ChainId.AVALANCHE
  public readonly address: string

  public constructor(
    chainId: ChainId = ChainId.AVALANCHE,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string
  ) {
    super(decimals, symbol, name)
    this.chainId = chainId

    // only validate address for evm chains
    const shouldValidateAddress = !!CHAINS[chainId]?.evm
    this.address = shouldValidateAddress ? validateAndParseAddress(address) : address
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WAVAX: { [chainId in ChainId]: Token } = {
  [ChainId.FUJI]: new Token(
    ChainId.FUJI,
    CHAINS[ChainId.FUJI].contracts!.wrapped_native_token,
    18,
    'WAVAX',
    'Wrapped AVAX'
  ),
  [ChainId.AVALANCHE]: new Token(
    ChainId.AVALANCHE,
    CHAINS[ChainId.AVALANCHE].contracts!.wrapped_native_token,
    18,
    'WAVAX',
    'Wrapped AVAX'
  ),
  [ChainId.WAGMI]: new Token(
    ChainId.WAGMI,
    CHAINS[ChainId.WAGMI].contracts!.wrapped_native_token,
    18,
    'wWAGMI',
    'Wrapped WAGMI'
  ),
  [ChainId.COSTON]: new Token(
    ChainId.COSTON,
    CHAINS[ChainId.COSTON].contracts!.wrapped_native_token,
    18,
    'WCFLR',
    'Wrapped CostonFlare'
  ),
  [ChainId.SONGBIRD]: new Token(
    ChainId.SONGBIRD,
    CHAINS[ChainId.SONGBIRD].contracts!.wrapped_native_token,
    18,
    'wWSGB',
    'Wrapped Songbird'
  ),
  [ChainId.FLARE_MAINNET]: new Token(
    ChainId.FLARE_MAINNET,
    CHAINS[ChainId.FLARE_MAINNET].contracts!.wrapped_native_token,
    18,
    'WFLR',
    'Wrapped Flare'
  ),
  [ChainId.NEAR_MAINNET]: new Token(
    ChainId.NEAR_MAINNET,
    CHAINS[ChainId.NEAR_MAINNET].contracts!.wrapped_native_token,
    24,
    'wNEAR',
    'Wrapped NEAR'
  ),
  [ChainId.NEAR_TESTNET]: new Token(
    ChainId.NEAR_TESTNET,
    CHAINS[ChainId.NEAR_TESTNET].contracts!.wrapped_native_token,
    24,
    'wNEAR',
    'Wrapped NEAR'
  ),
  [ChainId.HEDERA_TESTNET]: new Token(
    ChainId.HEDERA_TESTNET,
    CHAINS[ChainId.HEDERA_TESTNET].contracts!.wrapped_native_token,
    CHAINS[ChainId.HEDERA_TESTNET].nativeCurrency.decimals,
    'wHBAR',
    'Wrapped HBAR'
  ),
  [ChainId.HEDERA_MAINNET]: new Token(
    ChainId.HEDERA_MAINNET,
    CHAINS[ChainId.HEDERA_MAINNET].contracts!.wrapped_native_token,
    CHAINS[ChainId.HEDERA_MAINNET].nativeCurrency.decimals,
    'wHBAR',
    'Wrapped HBAR'
  ),
  [ChainId.ETHEREUM]: new Token(ChainId.ETHEREUM, ZERO_ADDRESS, 18, '', ''),
  [ChainId.POLYGON]: new Token(ChainId.POLYGON, ZERO_ADDRESS, 18, '', ''),
  [ChainId.FANTOM]: new Token(ChainId.FANTOM, ZERO_ADDRESS, 18, '', ''),
  [ChainId.XDAI]: new Token(ChainId.XDAI, ZERO_ADDRESS, 18, '', ''),
  [ChainId.BSC]: new Token(ChainId.BSC, ZERO_ADDRESS, 18, '', ''),
  [ChainId.ARBITRUM]: new Token(ChainId.ARBITRUM, ZERO_ADDRESS, 18, '', ''),
  [ChainId.CELO]: new Token(ChainId.CELO, ZERO_ADDRESS, 18, '', ''),
  [ChainId.OKXCHAIN]: new Token(ChainId.OKXCHAIN, ZERO_ADDRESS, 18, '', ''),
  [ChainId.VELAS]: new Token(ChainId.VELAS, ZERO_ADDRESS, 18, '', ''),
  [ChainId.AURORA]: new Token(ChainId.AURORA, ZERO_ADDRESS, 18, '', ''),
  [ChainId.CRONOS]: new Token(ChainId.CRONOS, ZERO_ADDRESS, 18, '', ''),
  [ChainId.FUSE]: new Token(ChainId.FUSE, ZERO_ADDRESS, 18, '', ''),
  [ChainId.MOONRIVER]: new Token(ChainId.MOONRIVER, ZERO_ADDRESS, 18, '', ''),
  [ChainId.MOONBEAM]: new Token(ChainId.MOONBEAM, ZERO_ADDRESS, 18, '', ''),
  [ChainId.OP]: new Token(ChainId.OP, ZERO_ADDRESS, 18, '', ''),
  [ChainId.COSTON2]: new Token(
    ChainId.COSTON2,
    CHAINS[ChainId.COSTON2].contracts!.wrapped_native_token,
    18,
    'WC2FLR',
    'Wrapped Coston2Flare'
  ),
  [ChainId.EVMOS_TESTNET]: new Token(
    ChainId.EVMOS_TESTNET,
    CHAINS[ChainId.EVMOS_TESTNET].contracts!.wrapped_native_token,
    18,
    'WEVMOS',
    'Wrapped Evmos'
  )
}
