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
  [ChainId.EVMOS_TESTNET]: '0x41a723f9e6457830b1b7a44df4435fab88581d073226894b33131815dd674c22',
  [ChainId.EVMOS_MAINNET]: POOL_INIT_CODE_HASH
}

export enum NumberType {
  // used for token quantities in non-transaction contexts (e.g. portfolio balances)
  TokenNonTx = 'token-non-tx',

  // used for token quantities in transaction contexts (e.g. swap, send)
  TokenTx = 'token-tx',

  // this formatter is only used for displaying the swap trade output amount
  // in the text input boxes. Output amounts on review screen should use the above TokenTx formatter
  SwapTradeAmount = 'swap-trade-amount',

  // fiat prices in any component that belongs in the Token Details flow (except for token stats)
  FiatTokenDetails = 'fiat-token-details',

  // fiat prices everywhere except Token Details flow
  FiatTokenPrice = 'fiat-token-price',

  // fiat values for market cap, TVL, volume in the Token Details screen
  FiatTokenStats = 'fiat-token-stats',

  // fiat price of token balances
  FiatTokenQuantity = 'fiat-token-quantity',

  // fiat gas prices
  FiatGasPrice = 'fiat-gas-price',

  // portfolio balance
  PortfolioBalance = 'portfolio-balance',

  // nft floor price denominated in a token (e.g, ETH)
  NFTTokenFloorPrice = 'nft-token-floor-price',

  // nft collection stats like number of items, holder, and sales
  NFTCollectionStats = 'nft-collection-stats',

  // nft floor price with trailing zeros
  NFTTokenFloorPriceTrailingZeros = 'nft-token-floor-price-trailing-zeros'
}
