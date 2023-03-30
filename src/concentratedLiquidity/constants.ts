import { ChainId, CHAINS } from '../chains'

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

export const CONCENTRATE_FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: CHAINS[ChainId.FUJI].contracts!.factory,
  [ChainId.AVALANCHE]: CHAINS[ChainId.AVALANCHE].contracts!.factory,
  [ChainId.WAGMI]: CHAINS[ChainId.WAGMI].contracts!.factory,
  [ChainId.COSTON]: CHAINS[ChainId.COSTON].contracts!.factory,
  [ChainId.SONGBIRD]: CHAINS[ChainId.SONGBIRD].contracts!.factory,
  [ChainId.FLARE_MAINNET]: CHAINS[ChainId.FLARE_MAINNET].contracts!.factory,
  [ChainId.NEAR_MAINNET]: CHAINS[ChainId.NEAR_MAINNET].contracts!.factory,
  [ChainId.NEAR_TESTNET]: CHAINS[ChainId.NEAR_TESTNET].contracts!.factory,
  [ChainId.HEDERA_TESTNET]: CHAINS[ChainId.HEDERA_TESTNET].contracts!.factory,
  [ChainId.HEDERA_MAINNET]: CHAINS[ChainId.HEDERA_MAINNET].contracts!.factory,
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
  [ChainId.COSTON2]: CHAINS[ChainId.COSTON2].contracts!.factory,
  [ChainId.EVMOS_TESTNET]: CHAINS[ChainId.EVMOS_TESTNET].contracts!.factory,
  [ChainId.EVMOS_MAINNET]: CHAINS[ChainId.EVMOS_MAINNET].contracts!.factory
}

export const POOL_INIT_CODE_HASH = '0x40231f6b438bce0797c9ada29b718a87ea0a5cea3fe9a771abdd76bd41a3e545'

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
