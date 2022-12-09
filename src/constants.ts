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
  [ChainId.NEAR_MAINNET]: CHAINS[ChainId.NEAR_MAINNET].contracts!.factory,
  [ChainId.NEAR_TESTNET]: CHAINS[ChainId.NEAR_TESTNET].contracts!.factory,
  [ChainId.HEDERA_TESTNET]: CHAINS[ChainId.HEDERA_TESTNET].contracts!.factory,
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
  [ChainId.OP]: ''
}

export const INIT_CODE_HASH = '0x40231f6b438bce0797c9ada29b718a87ea0a5cea3fe9a771abdd76bd41a3e545'

export const INIT_CODE_HASH_MAPPING: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: INIT_CODE_HASH,
  [ChainId.AVALANCHE]: INIT_CODE_HASH,
  [ChainId.WAGMI]: INIT_CODE_HASH,
  [ChainId.COSTON]: INIT_CODE_HASH,
  [ChainId.SONGBIRD]: INIT_CODE_HASH,
  [ChainId.NEAR_MAINNET]: '',
  [ChainId.NEAR_TESTNET]: '',
  [ChainId.HEDERA_TESTNET]: '0xd3e12a46a423ca4b4073538735498f47c65af1b02c11d3eabf32c9daa1f22fa0', // https://github.com/pangolindex/hedera-contracts/blob/main/contracts/pangolin-periphery/libraries/PangolinLibrary.sol#L22-L26
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
  [ChainId.OP]: ''
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
