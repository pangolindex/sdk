import { ChainId } from '../chains'

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000
}

/**
 * The default factory tick spacings by fee amount.
 */
export const TICK_SPACINGS: { [amount in FeeAmount]: number } = {
  [FeeAmount.LOWEST]: 1,
  [FeeAmount.LOW]: 10,
  [FeeAmount.MEDIUM]: 60,
  [FeeAmount.HIGH]: 200
}

export const POOL_INIT_CODE_HASH = '0x3fcff66860e53a77b6570a354f8e175e3e01fb76620272df5c59e6cf9bffc577'

export const POOL_INIT_CODE_HASH_MAPPING: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: POOL_INIT_CODE_HASH,
  [ChainId.AVALANCHE]: POOL_INIT_CODE_HASH,
  [ChainId.WAGMI]: POOL_INIT_CODE_HASH,
  [ChainId.COSTON]: POOL_INIT_CODE_HASH,
  [ChainId.SONGBIRD]: POOL_INIT_CODE_HASH,
  [ChainId.FLARE_MAINNET]: POOL_INIT_CODE_HASH,
  [ChainId.NEAR_MAINNET]: '',
  [ChainId.NEAR_TESTNET]: '',
  [ChainId.HEDERA_TESTNET]: '',
  [ChainId.HEDERA_MAINNET]: '',
  [ChainId.ETHEREUM]: '',
  [ChainId.POLYGON]: '',
  [ChainId.FANTOM]: '',
  [ChainId.XDAI]: '',
  [ChainId.BSC]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.CELO]: '',
  [ChainId.OKXCHAIN]: '',
  [ChainId.VELAS]: '',
  [ChainId.AURORA]: '',
  [ChainId.CRONOS]: '',
  [ChainId.FUSE]: '',
  [ChainId.MOONRIVER]: '',
  [ChainId.MOONBEAM]: '',
  [ChainId.OP]: '',
  [ChainId.COSTON2]: POOL_INIT_CODE_HASH,
  [ChainId.EVMOS_TESTNET]: POOL_INIT_CODE_HASH,
  [ChainId.EVMOS_MAINNET]: POOL_INIT_CODE_HASH
}
