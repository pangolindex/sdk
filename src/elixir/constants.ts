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

export const POOL_INIT_CODE_HASH = '0x41a723f9e6457830b1b7a44df4435fab88581d073226894b33131815dd674c22'

export const POOL_INIT_CODE_HASH_MAPPING: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: POOL_INIT_CODE_HASH,
  [ChainId.AVALANCHE]: POOL_INIT_CODE_HASH,
  [ChainId.WAGMI]: '',
  [ChainId.COSTON]: '',
  [ChainId.SONGBIRD]: '',
  [ChainId.FLARE_MAINNET]: '',
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
  [ChainId.COSTON2]: '',
  [ChainId.EVMOS_TESTNET]: POOL_INIT_CODE_HASH,
  [ChainId.EVMOS_MAINNET]: POOL_INIT_CODE_HASH,
  [ChainId.SKALE_BELLATRIX_TESTNET]: ''
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
