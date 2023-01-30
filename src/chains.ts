export enum ChainId {
  FUJI = 43113,
  AVALANCHE = 43114,
  WAGMI = 11111,
  COSTON = 16,
  SONGBIRD = 19,
  FLARE_MAINNET = 14,
  NEAR_MAINNET = 329847900,
  NEAR_TESTNET = 329847901,
  HEDERA_TESTNET = 296,
  HEDERA_MAINNET = 295,
  POLYGON = 137,
  ETHEREUM = 1,
  OKXCHAIN = 66,
  VELAS = 106,
  BSC = 56,
  CELO = 42220,
  ARBITRUM = 42161,
  AURORA = 1313161554,
  CRONOS = 25,
  FANTOM = 250,
  FUSE = 122,
  MOONRIVER = 1285,
  MOONBEAM = 1284,
  OP = 10,
  XDAI = 100,
  COSTON2 = 114,
  EVMOS_TESTNET = 9000
}

export enum StakingType {
  LEGACY = 'LEGACY',
  SAR_POSITIONS = 'SAR_POSITIONS',
  NEAR_STAKING = 'NEAR_STAKING'
}

interface StakingContract {
  address: string
  active: boolean
  reward_token: string
  type: StakingType
}

export enum AirdropType {
  LEGACY = 'LEGACY',
  MERKLE = 'MERKLE',
  MERKLE_TO_STAKING = 'MERKLE_TO_STAKING',
  MERKLE_TO_STAKING_COMPLIANT = 'MERKLE_TO_STAKING_COMPLIANT',
  NEAR_AIRDROP = 'NEAR_AIRDROP'
}

interface AirdropContract {
  address: string
  active: boolean
  type: AirdropType
}

interface AirdropContractTitled extends AirdropContract {
  title: string
}

export enum ChefType {
  MINI_CHEF = 'MINI_CHEF',
  MINI_CHEF_V2 = 'MINI_CHEF_V2',
  PANGO_CHEF = 'PANGO_CHEF',
  NEAR_CHEF = 'NEAR_CHEF'
}

interface ChefContract {
  address: string
  active: boolean
  type: ChefType
  compoundPoolIdForNonPngFarm?: number // this is compound pool id for non-png farm
}

export enum NetworkType {
  EVM = 'EVM',
  COSMOS = 'COSMOS'
}

export interface BridgeChain extends Omit<Chain, 'chain_id'> {
  chain_id?: number | string
  network_type?: NetworkType
  meta_data?: {
    [key: string]: any
  }
}

export interface Chain {
  id: string
  name: string
  chain_id?: number
  mainnet: boolean
  evm: boolean
  pangolin_is_live: boolean
  tracked_by_debank: boolean
  supported_by_gelato: boolean
  rpc_uri: string
  subgraph?: {
    exchange: string
  }
  symbol: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls?: string[]
  png_symbol?: string
  logo?: string
  coingecko_id?: string
  debank_pangolin_id?: string
  contracts?: {
    png: string
    factory: string
    router: string
    router_daas?: string
    wrapped_native_token: string
    local_multisig?: string
    community_treasury?: string
    treasury_vester?: string
    mini_chef?: ChefContract
    timelock?: string
    migrator?: string
    airdrop?: AirdropContract
    specialAirdrops?: AirdropContractTitled[]
    foundation_multisig?: string
    joint_multisig?: string
    revenue_distributor?: string
    governor?: string
    fee_collector?: string
    multicall: string
    staking?: StakingContract[]
  }
}

export const ETHEREUM_MAINNET: Chain = {
  id: 'ethereum_mainnet',
  chain_id: ChainId.ETHEREUM,
  name: 'Ethereum',
  symbol: 'ETH',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/eth.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  coingecko_id: 'ethereum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://etherscan.io']
}

export const OKXCHAIN_MAINNET: Chain = {
  id: 'okxchain_mainnet',
  chain_id: ChainId.OKXCHAIN,
  name: 'OKXChain',
  symbol: 'OKT',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/okx.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://exchainrpc.okex.org',
  coingecko_id: 'okc-token',
  nativeCurrency: {
    name: 'OKC',
    symbol: 'OKT',
    decimals: 18
  },
  blockExplorerUrls: ['https://www.oklink.com/en/okc']
}

export const VELAS_MAINNET: Chain = {
  id: 'velas_mainnet',
  chain_id: ChainId.VELAS,
  name: 'Velas',
  symbol: 'VLX',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/velas.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://evmexplorer.velas.com/rpc',
  coingecko_id: 'velas',
  nativeCurrency: {
    name: 'Velas',
    symbol: 'VLX',
    decimals: 18
  },
  blockExplorerUrls: ['https://evmexplorer.velas.com']
}

export const ARBITRUM_MAINNET: Chain = {
  id: 'arbitrum_mainnet',
  chain_id: ChainId.ARBITRUM,
  name: 'Arbitrum',
  symbol: 'ARB',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/arb.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://arb1.arbitrum.io/rpc',
  coingecko_id: 'arbitrum-one',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://arbiscan.io']
}

export const ARBITRUM_RINKEBY: Chain = {
  id: 'arbitrum_rinkeby',
  chain_id: 421611,
  name: 'Arbitrum Rinkbey',
  symbol: 'ARB',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/arb.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: true,
  rpc_uri: 'https://rinkeby.arbitrum.io/rpc',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io']
}

export const AURORA_MAINNET: Chain = {
  id: 'aurora_mainnet',
  chain_id: ChainId.AURORA,
  name: 'Aurora',
  symbol: 'AURORA',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/aurora.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.aurora.dev',
  coingecko_id: 'aurora',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://aurorascan.dev']
}

export const AURORA_TESTNET: Chain = {
  id: 'aurora_testnet',
  chain_id: 1313161555,
  name: 'Aurora Testnet',
  symbol: 'AURORA',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/aurora.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://testnet.aurora.dev',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.aurorascan.dev']
}

export const AVALANCHE_MAINNET: Chain = {
  id: 'avalanche_mainnet',
  chain_id: ChainId.AVALANCHE,
  name: 'Avalanche',
  symbol: 'AVAX',
  png_symbol: 'PNG',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/avax.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://api.avax.network/ext/bc/C/rpc',
  subgraph: {
    exchange: 'https://api.thegraph.com/subgraphs/name/pangolindex/exchange'
  },
  coingecko_id: 'avalanche',
  debank_pangolin_id: 'avax_pangolin',
  contracts: {
    png: '0x60781C2586D68229fde47564546784ab3fACA982',
    factory: '0xefa94DE7a4656D787667C749f7E1223D71E9FD88',
    router: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
    router_daas: '0xEfd958c7C68b7e6a88300E039cAE275ca741007F',
    wrapped_native_token: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    local_multisig: '0x66c048d27aFB5EE59E4C07101A483654246A4eda',
    community_treasury: '0x650f5865541f6D68BdDFE977dB933C293EA72358',
    treasury_vester: '0x6747AC215dAFfeE03a42F49FebB6ab448E12acEe',
    mini_chef: {
      address: '0x1f806f7C8dED893fd3caE279191ad7Aa3798E928',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    airdrop: {
      address: '0x0C58C2041da4CfCcF5818Bbe3b66DBC23B3902d9',
      active: false,
      type: AirdropType.LEGACY
    },
    timelock: '0xEB5c91bE6Dbfd30cf616127C2EA823C64e4b1ff8',
    governor: '0xb0Ff2b1047d9E8d294c2eD798faE3fA817F43Ee1',
    migrator: '0x4b23Aa72A1214d0E4fd3f2c8Da7C6ba660F7483C',
    multicall: '0x0FB54156B496b5a040b51A71817aED9e2927912E',
    staking: [
      {
        address: '0x88afdaE1a9F58Da3E68584421937E5F564A0135b',
        active: true,
        reward_token: '0x60781C2586D68229fde47564546784ab3fACA982',
        type: StakingType.LEGACY
      }
    ]
  },
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  blockExplorerUrls: ['https://snowtrace.io']
}

export const AVALANCHE_FUJI: Chain = {
  id: 'avalanche_fuji',
  chain_id: 43113,
  name: 'Avalanche Fuji',
  symbol: 'AVAX',
  png_symbol: 'fujiPNG',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/avax.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: true,
  rpc_uri: 'https://api.avax-test.network/ext/bc/C/rpc',
  contracts: {
    png: '0xAF5D473b3f8F96A5B21c6bbB97e09b491335acb9',
    factory: '0x2a496ec9e9bE22e66C61d4Eb9d316beaEE31A77b',
    router: '0x688d21b0B8Dc35971AF58cFF1F7Bf65639937860',
    router_daas: '0xFE97f59B72eEE0F29F93e12195C6F35DCdAB6899',
    wrapped_native_token: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
    timelock: '0xf4C589029be33cc4e4056B125794B35A2dF23136',
    mini_chef: {
      address: '0x2572ECa2be804f7799e3f3Ef1D1db60F512a0Ae3',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    community_treasury: '0x3a6e244678f392638876A92DAAa3C56e02dC1080',
    airdrop: {
      address: '0x630CC51306B1E2cf149B7F7a15F78bCD006A5D65',
      active: false,
      type: AirdropType.LEGACY
    },
    treasury_vester: '0xee82a2695c1ae2cCFC3DDDa643836Ff5E55Fa1e1',
    revenue_distributor: '0xF3861Acb8061A70499DC85c4a6aA9E934C83049f',
    fee_collector: '0x0609ce4F16388c440BF9a84b5E8df1b0438F714A',
    multicall: '0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f',
    staking: [
      {
        address: '0x5610E572c9f2a10BFd15861061F8B1Fe75e05b23',
        active: true,
        reward_token: '0xAF5D473b3f8F96A5B21c6bbB97e09b491335acb9',
        type: StakingType.LEGACY
      }
    ]
  },
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.snowtrace.io']
}

export const BOBA_MAINNET: Chain = {
  id: 'boba_mainnet',
  chain_id: 288,
  name: 'Boba',
  symbol: 'BOBA',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/boba.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.boba.network',
  coingecko_id: 'boba',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockexplorer.boba.network']
}

export const BITTORRENT_MAINNET: Chain = {
  id: 'bittorrent_mainnet',
  chain_id: 199,
  name: 'BitTorrent',
  symbol: 'BTT',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/btt.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.bt.io',
  nativeCurrency: {
    name: 'BitTorrent',
    symbol: 'BTT',
    decimals: 18
  },
  blockExplorerUrls: ['https://scan.bt.io']
}

export const BITTORRENT_TESTNET: Chain = {
  id: 'bittorrent_testnet',
  chain_id: 1028,
  name: 'BitTorrent Testnet',
  symbol: 'BTT',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/btt.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://test-rpc.bittorrentchain.io',
  nativeCurrency: {
    name: 'BitTorrent',
    symbol: 'BTT',
    decimals: 18
  },
  blockExplorerUrls: ['https://scan.bittorrentchain.io']
}

export const BSC_MAINNET: Chain = {
  id: 'bsc_mainnet',
  chain_id: ChainId.BSC,
  name: 'Binance',
  symbol: 'BSC',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/bsc.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://bsc-dataseed.binance.org',
  coingecko_id: 'binance-smart-chain',
  nativeCurrency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18
  },
  blockExplorerUrls: ['https://bscscan.com']
}

export const BSC_TESTNET: Chain = {
  id: 'bsc_testnet',
  chain_id: 97,
  name: 'Binance Testnet',
  symbol: 'BSC',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/bsc.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: true,
  rpc_uri: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  nativeCurrency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.bscscan.com']
}

export const CELO_MAINNET: Chain = {
  id: 'celo_mainnet',
  chain_id: ChainId.CELO,
  name: 'Celo',
  symbol: 'CELO',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/celo.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://forno.celo.org',
  coingecko_id: 'celo',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.celo.org']
}

export const CELO_ALFAJORES_TESTNET: Chain = {
  id: 'celo_alfadores_testnet',
  chain_id: 44787,
  name: 'Celo Alfajores',
  symbol: 'CELO',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/celo.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://alfajores-forno.celo-testnet.org',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18
  },
  blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org']
}

export const CELO_BAKLAVA_TESTNET: Chain = {
  id: 'celo_baklava_testnet',
  chain_id: 62320,
  name: 'Celo Baklava',
  symbol: 'CELO',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/celo.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://baklava-forno.celo-testnet.org',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18
  },
  blockExplorerUrls: ['https://baklava-blockscout.celo-testnet.org']
}

export const CRONOS_MAINNET: Chain = {
  id: 'cronos_mainnet',
  chain_id: ChainId.CRONOS,
  name: 'Cronos',
  symbol: 'CRO',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/cro.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://evm-cronos.crypto.org',
  coingecko_id: 'cronos',
  nativeCurrency: {
    name: 'Cronos',
    symbol: 'CRO',
    decimals: 18
  },
  blockExplorerUrls: ['https://cronos.org/explorer']
}

export const CRONOS_TESTNET: Chain = {
  id: 'cronos_testnet',
  chain_id: 338,
  name: 'Cronos',
  symbol: 'CRO',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/cro.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://cronos-testnet-3.crypto.org:8545',
  nativeCurrency: {
    name: 'Cronos',
    symbol: 'CRO',
    decimals: 18
  },
  blockExplorerUrls: ['https://cronos.org/explorer/testnet3']
}

export const COSTON_TESTNET: Chain = {
  id: 'coston_testnet',
  chain_id: ChainId.COSTON,
  name: 'Coston',
  symbol: 'cFLR',
  png_symbol: 'PCT',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/flare.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://coston-api.flare.network/ext/bc/C/rpc',
  contracts: {
    png: '0x0A8744c2a48b0e09a3e4C3A381A8E0d8d900bAFe',
    factory: '0xa5D4D920cea39f0344A99b2a3c4597E10DA16D88',
    router: '0x6a6C605700f477E56B9542Ca2a3D68B9A7edf599',
    wrapped_native_token: '0x1659941d425224408c5679eeef606666c7991a8A',
    local_multisig: '0x177126EC2D5BabD6a1374135F082b875773afC45',
    community_treasury: '0x48197135bA4a9F5F9aB1296A6405c9495AB4Cfd3',
    treasury_vester: '0x1a6a55a22a696F757f0ade055200308B53D70CAc',
    mini_chef: {
      address: '0xFf0C4041ba52428612320cAD2016d07B2e4A802D',
      active: true,
      type: ChefType.PANGO_CHEF
    },
    airdrop: {
      address: '0x700E2E6fd3C5174E9691a65DC12f44d0A8dd25EC',
      active: true,
      type: AirdropType.MERKLE_TO_STAKING
    },
    timelock: '0xc63C2BA9F4dD17F881d9195fD105611760689bAe',
    fee_collector: '0x39DEA895DA8cC6ef744Da4C5Cc06F1E6150362f1',
    multicall: '0xF7aB82e5253F65496e21dF0dacfA6D5e765b4874',
    staking: [
      {
        address: '0xc064943492c9DF4f8238Bf52E7B7170A0Ec6FBAF',
        active: true,
        reward_token: '0x0A8744c2a48b0e09a3e4C3A381A8E0d8d900bAFe',
        type: StakingType.SAR_POSITIONS
      }
    ]
  },
  nativeCurrency: {
    name: 'CostonFlare',
    symbol: 'CFLR',
    decimals: 18
  },
  blockExplorerUrls: ['https://coston-explorer.flare.network']
}

export const EVMOS_TESTNET: Chain = {
  id: 'evmos_testnet',
  chain_id: 9000,
  name: 'EVMOS Testnet',
  symbol: 'tEVMOS',
  png_symbol: 'evmPNG',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/evmos.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://eth.bd.evmos.dev:8545',
  contracts: {
    png: '0x171a6A80cdDDd8f69134ff0471523400f2C16ABe',
    factory: '0x02fD35823a82b8f02e5F2d1a351807B9d1B38c3B',
    router: '0x6b6D3049dD90E6Ecc84f8dca55f4A847b3a63fc2',
    wrapped_native_token: '0xcF5ef8d007a616066e5eaEa0916592374a0F478D',
    local_multisig: '0x90CE7198211D6B17be9fa5204701F9c9aCe2970b',
    community_treasury: '0x3520e13c0E3f49Aa522dBD4477280fe3DF8B40fC',
    treasury_vester: '0x6B77Cb69Dae236bC708d75B76356911D2D197601',
    mini_chef: {
      address: '0xA96b69EE04E33E1752b059a7a9B7C9FE2B3C93A9',
      active: true,
      type: ChefType.PANGO_CHEF
    },
    airdrop: {
      address: '0x2D1B541Cb20aD73217aC30cbA07C4571AF729Bc7',
      active: false,
      type: AirdropType.MERKLE_TO_STAKING
    },
    timelock: '0xdA291D8daD1c55BBe828c91C58d16A523148bE11',
    fee_collector: '0x0Da69A72C3875f74385BC1B633618e68AB2666F8',
    multicall: '0x4fE8a78EB5bbDdC90942e13a09397Ee3CA7ed350',
    staking: [
      {
        address: '0x997415e58dAEa9117027d55DAB7E765748C50834',
        active: true,
        reward_token: '0x171a6A80cdDDd8f69134ff0471523400f2C16ABe',
        type: StakingType.SAR_POSITIONS
      }
    ]
  },
  nativeCurrency: {
    name: 'EVMOS',
    symbol: 'EVMOS',
    decimals: 18
  },
  blockExplorerUrls: ['https://evm.evmos.dev']
}

export const EVMOS_MAINNET: Chain = {
  id: 'evmos_mainnet',
  chain_id: 9001,
  name: 'EVMOS',
  symbol: 'EVMOS',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/evmos.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://eth.bd.evmos.org:8545',
  nativeCurrency: {
    name: 'EVMOS',
    symbol: 'EVMOS',
    decimals: 18
  },
  blockExplorerUrls: ['https://evm.evmos.org']
}

export const FANTOM_MAINNET: Chain = {
  id: 'fantom_mainnet',
  chain_id: ChainId.FANTOM,
  name: 'Fantom',
  symbol: 'FTM',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/ftm.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://rpc.ftm.tools',
  coingecko_id: 'fantom',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18
  },
  blockExplorerUrls: ['https://ftmscan.com']
}

export const FANTOM_TESTNET: Chain = {
  id: 'fantom_testnet',
  chain_id: 4002,
  name: 'Fantom',
  symbol: 'FTM',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/ftm.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: true,
  rpc_uri: 'https://rpc.testnet.fantom.network',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.ftmscan.com']
}

export const FUSE_MAINNET: Chain = {
  id: 'fuse_mainnet',
  chain_id: ChainId.FUSE,
  name: 'Fuse',
  symbol: 'FUSE',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/fuse.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.fuse.io',
  coingecko_id: 'fuse',
  nativeCurrency: {
    name: 'Fuse',
    symbol: 'FUSE',
    decimals: 18
  },
  blockExplorerUrls: ['http://explorer.fuse.io']
}

export const FUSE_TESTNET: Chain = {
  id: 'fuse_testnet',
  chain_id: 123,
  name: 'Fuse',
  symbol: 'FUSE',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/fuse.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.fusespark.io',
  nativeCurrency: {
    name: 'Fuse',
    symbol: 'FUSE',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.fusespark.io']
}

export const HARMONY_MAINNET: Chain = {
  id: 'harmony_mainnet',
  chain_id: 1666600000,
  name: 'Harmony',
  symbol: 'ONE',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/one.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://api.harmony.one',
  coingecko_id: 'harmony-shard-0',
  nativeCurrency: {
    name: 'Harmony',
    symbol: 'ONE',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.harmony.one']
}

export const HARMONY_TESTNET: Chain = {
  id: 'harmony_testnet',
  chain_id: 1666700000,
  name: 'Harmony Testnet',
  symbol: 'ONE',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/one.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://api.s0.b.hmny.io',
  nativeCurrency: {
    name: 'Harmony',
    symbol: 'ONE',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.pops.one']
}

export const HECO_MAINNET: Chain = {
  id: 'heco_mainnet',
  chain_id: 128,
  name: 'Heco',
  symbol: 'HECO',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/heco.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://http-mainnet.hecochain.com',
  coingecko_id: 'huobi-token',
  nativeCurrency: {
    name: 'Heco',
    symbol: 'HECO',
    decimals: 18
  },
  blockExplorerUrls: ['https://hecoinfo.com']
}

export const HECO_TESTNET: Chain = {
  id: 'heco_testnet',
  chain_id: 256,
  name: 'Heco',
  symbol: 'HECO',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/heco.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://http-testnet.hecochain.com',
  nativeCurrency: {
    name: 'Heco',
    symbol: 'HECO',
    decimals: 18
  },
  blockExplorerUrls: ['https://scan-testnet.hecochain.com']
}

export const KLAYTN_MAINNET: Chain = {
  id: 'klaytn_mainnet',
  chain_id: 8217,
  name: 'Klaytn',
  symbol: 'KLAY',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/klay.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://kaikas.cypress.klaytn.net:8651',
  coingecko_id: 'klay-token',
  nativeCurrency: {
    name: 'Klaytn',
    symbol: 'KLAY',
    decimals: 18
  },
  blockExplorerUrls: ['https://scope.klaytn.com']
}

export const KLAYTN_BAOBAB: Chain = {
  id: 'klaytn_baobab',
  chain_id: 1001,
  name: 'Klaytn Baobab',
  symbol: 'KLAY',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/klay.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://api.baobab.klaytn.net:8651',
  nativeCurrency: {
    name: 'Klaytn',
    symbol: 'KLAY',
    decimals: 18
  },
  blockExplorerUrls: ['https://baobab.scope.klaytn.com']
}

export const METIS_MAINNET: Chain = {
  id: 'metis_mainnet',
  chain_id: 1088,
  name: 'Metis',
  symbol: 'METIS',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/metis.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://andromeda.metis.io/?owner=1088',
  coingecko_id: 'metis-andromeda',
  nativeCurrency: {
    name: 'Metis',
    symbol: 'METIS',
    decimals: 18
  },
  blockExplorerUrls: ['https://andromeda-explorer.metis.io']
}

export const METIS_RINKEBY: Chain = {
  id: 'metis_rinkeby',
  chain_id: 588,
  name: 'Metis Rinkeby',
  symbol: 'METIS',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/metis.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://stardust.metis.io/?owner=588',
  nativeCurrency: {
    name: 'Metis',
    symbol: 'tMETIS',
    decimals: 18
  },
  blockExplorerUrls: ['https://stardust-explorer.metis.io']
}

export const MOONRIVER_MAINNET: Chain = {
  id: 'moonriver_mainnet',
  chain_id: ChainId.MOONRIVER,
  name: 'Moonriver',
  symbol: 'MOVR',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/movr.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.moonriver.moonbeam.network',
  coingecko_id: 'moonriver',
  nativeCurrency: {
    name: 'Moonriver',
    symbol: 'MOVR',
    decimals: 18
  },
  blockExplorerUrls: ['https://moonriver.moonscan.io']
}

export const MOONBEAM_MAINNET: Chain = {
  id: 'moonbeam_mainnet',
  chain_id: ChainId.MOONBEAM,
  name: 'Moonbeam',
  symbol: 'MOBM',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/mobm.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.api.moonbeam.network',
  coingecko_id: 'moonbeam',
  nativeCurrency: {
    name: 'Moonbeam',
    symbol: 'GLMR',
    decimals: 18
  },
  blockExplorerUrls: ['https://moonscan.io']
}

export const MOONBEAM_MOONBASE: Chain = {
  id: 'moonbeam_moonbase',
  chain_id: 1287,
  name: 'Moonbase',
  symbol: 'MOONBASE',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/mobm.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.api.moonbase.moonbeam.network',
  nativeCurrency: {
    name: 'Moonbase',
    symbol: 'DEV',
    decimals: 18
  },
  blockExplorerUrls: ['https://moonbase.moonscan.io']
}

export const NEAR_MAINNET: Chain = {
  id: 'near_mainnet',
  chain_id: 329847900, // NEAR acutally doesn't have this concept. So this is our naming convention for non EVM chains without Chain IDs
  name: 'Near',
  symbol: `NEAR`,
  mainnet: true,
  evm: false,
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.mainnet.near.org',
  png_symbol: 'PNR',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/near.svg',
  contracts: {
    png: 'png-token-v1.testnet',
    factory: 'example2.near',
    router: 'example3.near',
    wrapped_native_token: 'wrap.near',
    local_multisig: 'example5.near',
    community_treasury: 'example6.near',
    treasury_vester: 'example7.near',
    mini_chef: {
      address: 'example8.near',
      active: true,
      type: ChefType.NEAR_CHEF
    },
    airdrop: {
      address: 'example9.near',
      active: false,
      type: AirdropType.NEAR_AIRDROP
    },
    timelock: 'example10.near',
    governor: 'example11.near',
    migrator: 'example12.near',
    multicall: ''
  },
  nativeCurrency: {
    name: 'Near',
    symbol: 'NEAR',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.near.org']
}

export const NEAR_TESTNET: Chain = {
  id: 'near_testnet',
  chain_id: 329847901, // NEAR acutally doesn't have this concept. So this is our naming convention for non EVM chains without Chain IDs
  name: 'Near',
  symbol: `NEAR`,
  mainnet: false,
  evm: false,
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.testnet.near.org',
  png_symbol: 'PNR',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/near.svg',
  contracts: {
    png: 'png-token-v1.testnet',
    factory: 'example2.near',
    router: 'example3.near',
    wrapped_native_token: 'wrap.testnet',
    local_multisig: 'example5.near',
    community_treasury: 'example6.near',
    treasury_vester: 'example7.near',
    mini_chef: {
      address: 'example8.near',
      active: true,
      type: ChefType.NEAR_CHEF
    },
    airdrop: {
      address: 'example9.near',
      active: false,
      type: AirdropType.NEAR_AIRDROP
    },
    timelock: 'example10.near',
    governor: 'example11.near',
    migrator: 'example12.near',
    multicall: ''
  },
  nativeCurrency: {
    name: 'Near',
    symbol: 'NEAR',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.testnet.near.org']
}

export const HEDERA_TESTNET: Chain = {
  id: 'hedera_testnet',
  chain_id: ChainId.HEDERA_TESTNET, // Hedera acutally doesn't have this concept. So this is our naming convention for non EVM chains without Chain IDs
  name: 'Hedera Testnet',
  symbol: `HBAR`,
  mainnet: false,
  evm: true,
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://hcs.testnet.mirrornode.hedera.com:5600',
  png_symbol: 'PBAR',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/hedera.png',
  contracts: {
    png: '0x0000000000000000000000000000000000000744',
    factory: '0x0000000000000000000000000000000000000748',
    router: '0x000000000000000000000000000000000000074b',
    wrapped_native_token: '0x000000000000000000000000000000000000073d',
    local_multisig: '0x0000000000000000000000000000000000000739',
    community_treasury: '0x0000000000000000000000000000000000000746',
    treasury_vester: '0x0000000000000000000000000000000000000743',
    mini_chef: {
      address: '0x0000000000000000000000000000000000000750',
      active: true,
      type: ChefType.PANGO_CHEF
    },
    airdrop: {
      address: '',
      active: false,
      type: AirdropType.NEAR_AIRDROP
    },
    staking: [
      {
        address: '0x0000000000000000000000000000000000000755',
        active: true,
        reward_token: '0x0000000000000000000000000000000000000744',
        type: StakingType.SAR_POSITIONS
      }
    ],
    timelock: '0x0000000000000000000000000000000000000740',
    governor: '0x000000000000000000000000000000000000075c',
    migrator: '',
    multicall: '0x0000000000000000000000000000000000000760'
  },
  nativeCurrency: {
    name: 'Hbar',
    symbol: 'HBAR',
    decimals: 8
  },
  blockExplorerUrls: ['https://ledger-testnet.hashlog.io']
}

export const HEDERA_MAINNET: Chain = {
  id: 'hedera_mainnet',
  chain_id: ChainId.HEDERA_MAINNET,
  name: 'Hedera',
  symbol: `HBAR`,
  mainnet: false,
  evm: true,
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet-public.mirrornode.hedera.com:443',
  png_symbol: 'PBAR',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/hedera.png',
  contracts: {
    png: '0x00000000000000000000000000000000001a88b2',
    factory: '0x00000000000000000000000000000000001a88bc',
    router: '0x00000000000000000000000000000000001a88c9',
    wrapped_native_token: '0x00000000000000000000000000000000001a8837',
    local_multisig: '0x00000000000000000000000000000000001a7e7e',
    community_treasury: '0x00000000000000000000000000000000001a88b5',
    treasury_vester: '0x00000000000000000000000000000000001a88b1',
    mini_chef: {
      address: '0x00000000000000000000000000000000001a88db',
      active: true,
      type: ChefType.PANGO_CHEF
    },
    airdrop: {
      address: '',
      active: false,
      type: AirdropType.NEAR_AIRDROP
    },
    staking: [
      {
        address: '0x00000000000000000000000000000000001a8957',
        active: true,
        reward_token: '0x00000000000000000000000000000000001a88b2',
        type: StakingType.SAR_POSITIONS
      }
    ],
    timelock: '0x00000000000000000000000000000000001a88ac',
    governor: '0x00000000000000000000000000000000001a896e',
    migrator: '',
    multicall: '0x00000000000000000000000000000000001a89ac'
  },
  nativeCurrency: {
    name: 'Hbar',
    symbol: 'HBAR',
    decimals: 8
  },
  blockExplorerUrls: ['https://ledger.hashlog.io']
}

export const OEC_MAINNET: Chain = {
  id: 'oec_mainnet',
  chain_id: 66,
  name: 'OEC',
  symbol: 'OKT',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/okt.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://exchainrpc.okex.org',
  coingecko_id: 'okex-chain',
  nativeCurrency: {
    name: 'OEC',
    symbol: 'OKT',
    decimals: 18
  },
  blockExplorerUrls: ['https://www.oklink.com/okexchain']
}

export const OEC_TESTNET: Chain = {
  id: 'oec_testnet',
  chain_id: 65,
  name: 'OEC Testnet',
  symbol: 'OKT',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/okt.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://exchaintestrpc.okex.org',
  nativeCurrency: {
    name: 'OEC',
    symbol: 'OKT',
    decimals: 18
  },
  blockExplorerUrls: ['https://www.oklink.com/oec-test']
}

export const OP_MAINNET: Chain = {
  id: 'op_mainnet',
  chain_id: ChainId.OP,
  name: 'Optimism',
  symbol: 'OP',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/op.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.optimism.io',
  coingecko_id: 'optimistic-ethereum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://optimistic.etherscan.io']
}

export const OP_KOVAN: Chain = {
  id: 'op_kovan',
  chain_id: 69,
  name: 'Optimism Kovan',
  symbol: 'OP',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/op.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://kovan.optimism.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://kovan-optimistic.etherscan.io']
}

export const POLYGON_MAINNET: Chain = {
  id: 'polygon_mainnet',
  chain_id: ChainId.POLYGON,
  name: 'Polygon',
  symbol: 'MATIC',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/matic.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://polygon-rpc.com',
  coingecko_id: 'polygon-pos',
  nativeCurrency: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18
  },
  blockExplorerUrls: ['https://polygonscan.com']
}

export const POLYGON_MUMBAI: Chain = {
  id: 'polygon_mumbai',
  chain_id: 80001,
  name: 'Polygon Mumbai',
  symbol: 'MATIC',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/matic.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: true,
  rpc_uri: 'https://matic-mumbai.chainstacklabs.com',
  contracts: {
    png: '0x4828a3D98E428e73184374845f23C40eB76bA695',
    factory: '0xf7b351C98B5585b7aDa089F3fFD0fED785fB6cff',
    router: '0x680ad00c72B8d55436E2812Df0f5a9Df7675e054',
    wrapped_native_token: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    local_multisig: '0x2412CF7162500001035B34a4aC4Cf4876B9a6f4b',
    foundation_multisig: '0x9284868361460C0Ca3dfcDcf035e90F0ea3A72A0',
    joint_multisig: '0x38F6d835FAF60a891016b2FC5692E76D2c6eEcbF',
    community_treasury: '0x791d828FA611D5cD086e8047EAa8d7276c8d943E',
    treasury_vester: '0xFeC5354eF11981D5dAF92F6CA61e618c5AdF4FD5',
    mini_chef: {
      address: '0xa34Ad412652267FB3b1261D7d4F351a678B01Bf8',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    airdrop: {
      address: '0x34338ad5D7fd49B24D07D1D8e8d38Fc64F42f94A',
      active: false,
      type: AirdropType.LEGACY
    },
    timelock: '0xE6ec3b8AD6ad20210a2698d89016DDF6965E5fBC',
    revenue_distributor: '0x780A51831dc1cE3AAD2879479dBE9419e834744c',
    fee_collector: '0xB2FcD54680150e3033A878cf1F689e1256d51fc5',
    multicall: '',
    staking: [
      {
        address: '0x3AA2baD17b768fFe5F9Fa05Ca95f97959862B41B',
        active: true,
        reward_token: '0x4828a3D98E428e73184374845f23C40eB76bA695',
        type: StakingType.LEGACY
      }
    ]
  },
  nativeCurrency: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18
  },
  blockExplorerUrls: ['https://mumbai.polygonscan.com']
}

export const SONGBIRD_CANARY: Chain = {
  id: 'songbird_canary',
  chain_id: ChainId.SONGBIRD,
  name: 'Songbird',
  symbol: 'SGB',
  png_symbol: 'PSB',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/sgb.jpg',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://sgb.ftso.com.au/ext/bc/C/rpc',
  contracts: {
    png: '0xb2987753D1561570f726Aa373F48E77e27aa5FF4',
    factory: '0xB66E62b25c42D55655a82F8ebf699f2266f329FB',
    router: '0x6591cf4E1CfDDEcB4Aa5946c033596635Ba6FB0F',
    router_daas: '0xBCFced55B59AA7c0269571735eD2C2CCf6c63963',
    wrapped_native_token: '0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED',
    local_multisig: '0xe18dFC20edE326930d11b3316E92bdC1F606dc94',
    community_treasury: '0xA2e6eFFdbb278744E286F602Bfaa2BcDAccBb1AA',
    treasury_vester: '0x47d3d75E68594960845Bb3fD89f6a73E0Af8093E',
    mini_chef: {
      address: '0x76489156Fff6f4B89626f58386366941150642B7',
      active: true,
      type: ChefType.PANGO_CHEF
    },
    airdrop: {
      address: '0x3B8377E6a9d527b4587F251bce706b53DAC26cf6',
      active: true,
      type: AirdropType.MERKLE_TO_STAKING_COMPLIANT
    },
    specialAirdrops: [
      {
        title: 'Old PSB Reimbursement',
        address: '0x78407686458ACf7FceA53Cf73697d0ff51052ca6',
        active: true,
        type: AirdropType.MERKLE_TO_STAKING_COMPLIANT
      }
    ],
    timelock: '0xF92F8A011A55C243CBAA096A62d9C48880070af6',
    fee_collector: '0x7d84e8A7c89F84a97a0e190B45E4D2fC27412894',
    multicall: '0x17032Ea9c3a13Ed337665145364c0d2aD1108c91',
    staking: [
      {
        address: '0x7428A089A79B24400a620F1Cbf8bd0526cFae777',
        active: true,
        reward_token: '0xb2987753D1561570f726Aa373F48E77e27aa5FF4',
        type: StakingType.SAR_POSITIONS
      }
    ]
  },
  nativeCurrency: {
    name: 'Songbird',
    symbol: 'SGB',
    decimals: 18
  },
  blockExplorerUrls: ['https://songbird-explorer.flare.network']
}

export const FLARE_MAINNET: Chain = {
  id: 'flare_mainnet',
  chain_id: 14,
  name: 'Flare',
  symbol: 'FLR',
  png_symbol: 'PFL',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/flare.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://flare-api.flare.network/ext/C/rpc',
  contracts: {
    png: '0xB5010D5Eb31AA8776b52C7394B76D6d627501C73',
    factory: '0xbfe13753156b9c6b2818FB45ff3D2392ea43d79A',
    router: '0xA981cb468c87Ed32F37dE546e25a7c5FF17e2308',
    wrapped_native_token: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d',
    local_multisig: '0xE688399009a1c283FAD889d3cedF6FfF4D685d51',
    community_treasury: '0x5d29aDabe7a49cB27a2c8d2Db62814B88F25501c',
    treasury_vester: '0xa0C70D6Ac3FCBeA51c8126E049a9fed560504148',
    mini_chef: {
      address: '0xe19a6a2253B40F884FcaE7945C3edbB5AAf8cb60',
      active: true,
      type: ChefType.PANGO_CHEF
    },
    airdrop: {
      address: '0x290593624b60D5c8EBf329344343d2cD21c46Cf3',
      active: false,
      type: AirdropType.MERKLE_TO_STAKING
    },
    specialAirdrops: [],
    timelock: '0x8a4A5eEC59899F2d23B08f0188d6eB540cF4EccC',
    fee_collector: '0xacA1a5601082F544299C80421FE69b08334d71c6',
    multicall: '0x336897CAe2791048DA77EEa2A43BFB96342b9CE1',
    staking: [
      {
        address: '0x12245B3Fe351ec3BE15EF971f31927Af1292Ff40',
        active: true,
        reward_token: '0xB5010D5Eb31AA8776b52C7394B76D6d627501C73',
        type: StakingType.SAR_POSITIONS
      }
    ]
  },
  nativeCurrency: {
    name: 'Flare',
    symbol: 'FLR',
    decimals: 18
  },
  blockExplorerUrls: ['https://flare-explorer.flare.network']
}

export const WAGMI_FUJI_SUBNET: Chain = {
  id: 'wagmi_fuji_subnet',
  chain_id: ChainId.WAGMI,
  name: 'Wagmi',
  symbol: 'WGMI',
  png_symbol: 'wagmiPNG',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/wgmi.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc',
  contracts: {
    png: '0xbdf33c7128fBB220fc0e4Be277697cEeef8BdfF5',
    factory: '0xee2162F7A04f3abA4925BfdC2e262533bd6Be516',
    router: '0x924ec1B00109D355Bb2Aa045fAC3b08ceB70Fa3d',
    wrapped_native_token: '0x3Ee7094DADda15810F191DD6AcF7E4FFa37571e4',
    local_multisig: '0x0000000000000000000000000000000000000000',
    community_treasury: '0x2CE6B673aDB3032A1694daC7c1F07c345F18Ae2d',
    treasury_vester: '0x9DB06A311B3c06D0841782BA0D5004CDEA96e21A',
    mini_chef: {
      address: '0x3014526b462ceef5734d9AaAe24321769E59269a',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    airdrop: {
      address: '0x0BD8b5D5FF2d4FCcDf7782Af15368FcAFE040Bd1',
      active: false,
      type: AirdropType.LEGACY
    },
    timelock: '0x2d41E2CDf9E74686d89e4A0BeA5dD4D01F7D134e',
    governor: '0x0000000000000000000000000000000000000000',
    migrator: '0x0000000000000000000000000000000000000000',
    multicall: '0x5138349f3027F1e2c2f10eDAD83d38096C0D8Abe',
    staking: [
      {
        address: '0x4C08b0D7F51A27db7baFb8Dc4632494Df8d53Af8',
        active: true,
        reward_token: '0xbdf33c7128fBB220fc0e4Be277697cEeef8BdfF5',
        type: StakingType.LEGACY
      },
      {
        address: '0xf9E3691617151969f30b0Da57AA0c9f4698ef6ab',
        active: true,
        reward_token: '0xbdf33c7128fBB220fc0e4Be277697cEeef8BdfF5',
        type: StakingType.SAR_POSITIONS
      }
    ]
  },
  nativeCurrency: {
    name: 'Wagmi',
    symbol: 'WGMI',
    decimals: 18
  },
  blockExplorerUrls: ['https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer']
}

export const XDAI_MAINNET: Chain = {
  id: 'xdai_mainnet',
  chain_id: ChainId.XDAI,
  name: 'Gnosis',
  symbol: 'XDAI',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/xdai.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.xdaichain.com',
  coingecko_id: 'xdai',
  nativeCurrency: {
    name: 'Gnosis',
    symbol: 'xDAI',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockscout.com/xdai/mainnet']
}

export const EWC_MAINNET: Chain = {
  id: 'ewc_mainnet',
  chain_id: 246,
  name: 'Energy Web Chain',
  symbol: 'EWT',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/ewc.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.energyweb.org',
  nativeCurrency: {
    name: 'Energy Web Token',
    symbol: 'EWT',
    decimals: 18
  },
  blockExplorerUrls: ['http://explorer.energyweb.org']
}

export const EWC_TESTNET: Chain = {
  id: 'ewc_testnet',
  chain_id: 73799,
  name: 'Volta',
  symbol: 'VT',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/ewc.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://volta-rpc.energyweb.org',
  nativeCurrency: {
    name: 'Volta',
    symbol: 'VT',
    decimals: 18
  },
  blockExplorerUrls: ['http://volta-aexplorer.energyweb.org']
}

export const IOTEX_MAINNET: Chain = {
  id: 'iotex_mainnet',
  chain_id: 4689,
  name: 'IoTex Mainnet',
  symbol: 'IOTX',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/iotx.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://babel-api.mainnet.iotex.io',
  coingecko_id: 'iotex',
  nativeCurrency: {
    name: 'IoTex',
    symbol: 'IOTX',
    decimals: 18
  },
  blockExplorerUrls: ['https://iotexscan.io']
}

export const IOTEX_TESTNET: Chain = {
  id: 'iotex_testnet',
  chain_id: 4690,
  name: 'IoTex Testnet',
  symbol: 'IOTX',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/iotx.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://babel-api.testnet.iotex.io',
  nativeCurrency: {
    name: 'IoTex',
    symbol: 'IOTX',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.iotexscan.io']
}

export const ASTAR_MAINNET: Chain = {
  id: 'astar_mainnet',
  chain_id: 592,
  name: 'Astar Network',
  symbol: 'ASTR',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/astr.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://astar.api.onfinality.io/public',
  nativeCurrency: {
    name: 'Astar',
    symbol: 'ASTL',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockscout.com/astar']
}

export const SHIDEN_MAINNET: Chain = {
  id: 'astar_shiden_testnet',
  chain_id: 336,
  name: 'Shiden Network',
  symbol: 'SDN',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/astr.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://shiden.api.onfinality.io/public',
  nativeCurrency: {
    name: 'Shiden',
    symbol: 'SDN',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockscout.com/shiden']
}

export const SHIBUYA_TESTNET: Chain = {
  id: 'astar_shibuya_testnet',
  chain_id: 81,
  name: 'Shibuya Network',
  symbol: 'SBY',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/astr.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.shibuya.astar.network:8545',
  nativeCurrency: {
    name: 'Shibuya',
    symbol: 'SBY',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockscout.com/shibuya']
}

export const TELOS_MAINNET: Chain = {
  id: 'telos_mainnet',
  chain_id: 40,
  name: 'Telos',
  symbol: 'TLOS',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/telos.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.telos.net/evm',
  coingecko_id: 'telos',
  nativeCurrency: {
    name: 'TELOS',
    symbol: 'TLOS',
    decimals: 18
  },
  blockExplorerUrls: ['https://www.teloscan.io']
}

export const TELOS_TESTNET: Chain = {
  id: 'telos_testnet',
  chain_id: 41,
  name: 'Telos Testnet',
  symbol: 'TLOS',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/telos.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://testnet.telos.net/evm',
  nativeCurrency: {
    name: 'TELOS',
    symbol: 'TLOS',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.telos.net/v2/explore']
}

export const OASIS_MAINNET: Chain = {
  id: 'oasis_mainnet',
  chain_id: 42262,
  name: 'Oasis Emerald',
  symbol: 'ROSE',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/oasis.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://emerald.oasis.dev',
  coingecko_id: 'oasis',
  nativeCurrency: {
    name: 'Oasis Network',
    symbol: 'ROSE',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.emerald.oasis.dev']
}

export const OASIS_TESTNET: Chain = {
  id: 'oasis_testnet',
  chain_id: 42261,
  name: 'Oasis Emerald Testnet',
  symbol: 'ROSE',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/oasis.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://testnet.emerald.oasis.dev',
  nativeCurrency: {
    name: 'Oasis Network',
    symbol: 'ROSE',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.explorer.emerald.oasis.dev']
}

export const GODWOKEN_MAINNET: Chain = {
  id: 'godwoken_mainnet',
  chain_id: 71394,
  name: 'Godwoken Testnet',
  symbol: 'CKB',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/godwoken.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.godwoken.io/rpc/eth-wallet',
  nativeCurrency: {
    name: 'Nervos Network',
    symbol: 'CKB',
    decimals: 18
  },
  blockExplorerUrls: ['https://gwscan.com']
}

export const GODWOKEN_TESTNET: Chain = {
  id: 'godwoken_mainnet',
  chain_id: 71393,
  name: 'Godwoken Testnet',
  symbol: 'CKB',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/godwoken.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://godwoken-testnet-web3-v1-rpc.ckbapp.dev/',
  nativeCurrency: {
    name: 'Nervos Network',
    symbol: 'CKB',
    decimals: 18
  },
  blockExplorerUrls: ['https://aggron.gwscan.com/en-US']
}

export const COSTON2_TESTNET: Chain = {
  id: 'coston2_testnet',
  chain_id: ChainId.COSTON2,
  name: 'COSTON2 Testnet',
  symbol: 'C2FLR',
  png_symbol: 'PCT2',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/flare.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://coston2-api.flare.network/ext/C/rpc',
  contracts: {
    png: '0x6169CD307Be7E24152dF23a7A945A1ea3eC7b438',
    factory: '0x4a2ba0812a92c78b3975bA25509b08b49972dFFa',
    router: '0x1435422E3765898D3bD167DC06b36e9a8AEf4784',
    wrapped_native_token: '0xC67DCE33D7A8efA5FfEB961899C73fe01bCe9273',
    local_multisig: '0x3dC36E8244e9A9aeF85129475015db6F4aBAa3b8',
    community_treasury: '0x2C6C561ab9C24cB12f24B886F055c1F972819b8D',
    treasury_vester: '0x95087BaAcDb2713b4CA5cD2F79532fA92694b87F',
    mini_chef: {
      address: '0x07Fe5fD0476454a43f905649d59Ea5941C9a87B8',
      active: true,
      type: ChefType.PANGO_CHEF,
      compoundPoolIdForNonPngFarm: 3
    },
    airdrop: {
      address: '0xb52Fa2153F2cFD02CFF545c55479f3D5cd73292e',
      active: false,
      type: AirdropType.MERKLE_TO_STAKING
    },
    timelock: '0x259F60251abb18B307FF37FD4DcD3657FCa52074',
    fee_collector: '0xe789277c602bD78D80fFa38B957b41a548E792f9',
    multicall: '0x1E253ce1648e498db48960A5dAb9Fc63Cf9c418D',
    staking: [
      {
        address: '0xDd1a0e81496bB29fE8f8917ff1a8A50b45194ac2',
        active: true,
        reward_token: '0x6169CD307Be7E24152dF23a7A945A1ea3eC7b438',
        type: StakingType.SAR_POSITIONS
      }
    ]
  },
  nativeCurrency: {
    name: 'Coston2Flare',
    symbol: 'C2FLR',
    decimals: 18
  },
  blockExplorerUrls: ['https://coston2-explorer.flare.network']
}

export const CHAINS: { [chainId in ChainId]: Chain } = {
  [ChainId.FUJI]: AVALANCHE_FUJI,
  [ChainId.AVALANCHE]: AVALANCHE_MAINNET,
  [ChainId.WAGMI]: WAGMI_FUJI_SUBNET,
  [ChainId.COSTON]: COSTON_TESTNET,
  [ChainId.SONGBIRD]: SONGBIRD_CANARY,
  [ChainId.FLARE_MAINNET]: FLARE_MAINNET,
  [ChainId.NEAR_MAINNET]: NEAR_MAINNET,
  [ChainId.NEAR_TESTNET]: NEAR_TESTNET,
  [ChainId.HEDERA_TESTNET]: HEDERA_TESTNET,
  [ChainId.HEDERA_MAINNET]: HEDERA_MAINNET,
  [ChainId.ETHEREUM]: ETHEREUM_MAINNET,
  [ChainId.POLYGON]: POLYGON_MAINNET,
  [ChainId.FANTOM]: FANTOM_MAINNET,
  [ChainId.XDAI]: XDAI_MAINNET,
  [ChainId.BSC]: BSC_MAINNET,
  [ChainId.ARBITRUM]: ARBITRUM_MAINNET,
  [ChainId.CELO]: CELO_MAINNET,
  [ChainId.OKXCHAIN]: OKXCHAIN_MAINNET,
  [ChainId.VELAS]: VELAS_MAINNET,
  [ChainId.AURORA]: AURORA_MAINNET,
  [ChainId.CRONOS]: CRONOS_MAINNET,
  [ChainId.FUSE]: FUSE_MAINNET,
  [ChainId.MOONRIVER]: MOONRIVER_MAINNET,
  [ChainId.MOONBEAM]: MOONBEAM_MAINNET,
  [ChainId.OP]: OP_MAINNET,
  [ChainId.COSTON2]: COSTON2_TESTNET,
  [ChainId.EVMOS_TESTNET]: EVMOS_TESTNET
}

export const ALL_CHAINS: Chain[] = [
  AVALANCHE_MAINNET,
  SONGBIRD_CANARY,
  AVALANCHE_FUJI,
  COSTON_TESTNET,
  WAGMI_FUJI_SUBNET,
  HEDERA_TESTNET,
  ETHEREUM_MAINNET,
  BSC_MAINNET,
  POLYGON_MAINNET,
  OKXCHAIN_MAINNET,
  VELAS_MAINNET,
  ARBITRUM_MAINNET,
  ARBITRUM_RINKEBY,
  AURORA_MAINNET,
  AURORA_TESTNET,
  BOBA_MAINNET,
  BITTORRENT_MAINNET,
  BSC_TESTNET,
  CELO_MAINNET,
  CELO_ALFAJORES_TESTNET,
  CELO_BAKLAVA_TESTNET,
  CRONOS_MAINNET,
  CRONOS_TESTNET,
  EVMOS_MAINNET,
  EVMOS_TESTNET,
  FANTOM_MAINNET,
  FANTOM_TESTNET,
  FLARE_MAINNET,
  FUSE_MAINNET,
  FUSE_TESTNET,
  HARMONY_MAINNET,
  HARMONY_TESTNET,
  HECO_MAINNET,
  HECO_TESTNET,
  KLAYTN_MAINNET,
  KLAYTN_BAOBAB,
  METIS_MAINNET,
  METIS_RINKEBY,
  MOONRIVER_MAINNET,
  MOONBEAM_MAINNET,
  MOONBEAM_MOONBASE,
  OEC_MAINNET,
  OEC_TESTNET,
  OP_MAINNET,
  OP_KOVAN,
  POLYGON_MUMBAI,
  XDAI_MAINNET,
  EWC_MAINNET,
  EWC_TESTNET,
  IOTEX_MAINNET,
  IOTEX_TESTNET,
  ASTAR_MAINNET,
  SHIDEN_MAINNET,
  SHIBUYA_TESTNET,
  TELOS_MAINNET,
  TELOS_TESTNET,
  OASIS_MAINNET,
  OASIS_TESTNET,
  GODWOKEN_MAINNET,
  GODWOKEN_TESTNET,
  COSTON2_TESTNET
]
