import JSBI from 'jsbi'
import { ChainId, CHAINS } from './chains'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
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
  [ChainId.EVMOS_TESTNET]: CHAINS[ChainId.EVMOS_TESTNET].contracts!.factory
}

export const INIT_CODE_HASH = '0x40231f6b438bce0797c9ada29b718a87ea0a5cea3fe9a771abdd76bd41a3e545'

export const INIT_CODE_HASH_MAPPING: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: INIT_CODE_HASH,
  [ChainId.AVALANCHE]: INIT_CODE_HASH,
  [ChainId.WAGMI]: INIT_CODE_HASH,
  [ChainId.COSTON]: INIT_CODE_HASH,
  [ChainId.SONGBIRD]: INIT_CODE_HASH,
  [ChainId.FLARE_MAINNET]: INIT_CODE_HASH,
  [ChainId.NEAR_MAINNET]: '',
  [ChainId.NEAR_TESTNET]: '',
  [ChainId.HEDERA_TESTNET]: '0x498c05f5d58b176beadaf081fac3f417a35b30a9bf2835cfb1999c6a6c462df6', // https://github.com/pangolindex/hedera-contracts/blob/main/contracts/pangolin-periphery/libraries/PangolinLibrary.sol#L22-L26
  [ChainId.HEDERA_MAINNET]: '0x498c05f5d58b176beadaf081fac3f417a35b30a9bf2835cfb1999c6a6c462df6', // https://github.com/pangolindex/hedera-contracts/blob/main/contracts/pangolin-periphery/libraries/PangolinLibrary.sol#L22-L26
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
  [ChainId.COSTON2]: INIT_CODE_HASH,
  [ChainId.EVMOS_TESTNET]: INIT_CODE_HASH
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _998 = JSBI.BigInt(998)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
