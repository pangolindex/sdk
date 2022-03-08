interface StakingContract {
  address: string;
  active: boolean;
  reward_token: string;
}

export interface Chain {
  id: string;
  name: string;
  chain_id: number;
  mainnet: boolean;
  pangolin_is_live: boolean;
  tracked_by_debank: boolean;
  rpc_uri: string;
  symbol: string;
  png_symbol?: string;
  logo?: string;
  contracts?: {
    png: string;
    factory: string;
    router: string;
    wrapped_native_token: string;
    local_multisig?: string;
    community_treasury?: string;
    treasury_vester?: string;
    mini_chef?: string;
    timelock?: string;
    migrator?: string;
    airdrop?: string;
    foundation_multisig?: string;
    joint_multisig?: string;
    revenue_distributor?: string;
    governor?: string;
    fee_collector?: string;
    staking?: StakingContract[];
  }
}

export const ETHEREUM_MAINNET: Chain = {
  id: 'ethereum_mainnet',
  chain_id: 1,
  name: 'Ethereum',
  symbol: 'ETH',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/eth/42ba589cd077e7bdd97db6480b0ff61d.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
}

export const ARBITRUM_MAINNET: Chain = {
  id: 'arbitrum_mainnet',
  chain_id: 42161,
  name: 'Arbitrum',
  symbol: 'ARB',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/arb/f6d1b236259654d531a1459b2bccaf64.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://arb1.arbitrum.io/rpc',
}

export const ARBITRUM_RINKEBY: Chain = {
  id: 'arbitrum_rinkeby',
  chain_id: 421611,
  name: 'Arbitrum',
  symbol: 'ARB',
  mainnet: false,
  logo: 'https://static.debank.com/image/chain/logo_url/arb/f6d1b236259654d531a1459b2bccaf64.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://rinkeby.arbitrum.io/rpc',
}

export const AURORA_MAINNET: Chain = {
  id: 'aurora_mainnet',
  chain_id: 1313161554,
  name: 'Aurora',
  symbol: 'AURORA',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/aurora/c7590fd2defb8e7d7dc071166838c33a.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://mainnet.aurora.dev',
}

export const AURORA_TESTNET: Chain = {
  id: 'aurora_testnet',
  chain_id: 1313161555,
  name: 'Aurora',
  symbol: 'AURORA',
  mainnet: false,
  logo: 'https://static.debank.com/image/chain/logo_url/aurora/c7590fd2defb8e7d7dc071166838c33a.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://testnet.aurora.dev/',
}

export const AVALANCHE_MAINNET: Chain = {
  id: 'avalanche_mainnet',
  chain_id: 43114,
  name: 'Avalanche',
  symbol: 'AVAX',
  png_symbol: 'PNG',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/avax/4d1649e8a0c7dec9de3491b81807d402.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  rpc_uri: 'https://api.avax.network/ext/bc/C/rpc',
  contracts: {
    png: '0x60781C2586D68229fde47564546784ab3fACA982',
    factory: '0xefa94DE7a4656D787667C749f7E1223D71E9FD88',
    router: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
    wrapped_native_token: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    local_multisig: '0x66c048d27aFB5EE59E4C07101A483654246A4eda',
    community_treasury: '0x650f5865541f6D68BdDFE977dB933C293EA72358',
    treasury_vester: '0x6747AC215dAFfeE03a42F49FebB6ab448E12acEe',
    mini_chef: '0x1f806f7C8dED893fd3caE279191ad7Aa3798E928',
    airdrop: '0x0C58C2041da4CfCcF5818Bbe3b66DBC23B3902d9',
    timelock: '0xEB5c91bE6Dbfd30cf616127C2EA823C64e4b1ff8',
    governor: '0xb0Ff2b1047d9E8d294c2eD798faE3fA817F43Ee1',
    migrator: '0x4b23Aa72A1214d0E4fd3f2c8Da7C6ba660F7483C',
    staking: [
      {
        address: '0x88afdaE1a9F58Da3E68584421937E5F564A0135b',
        active: true,
        reward_token: '0x60781C2586D68229fde47564546784ab3fACA982',
      }
    ]
  }
}

export const AVALANCHE_FUJI: Chain = {
  id: 'avalanche_fuji',
  chain_id: 43113,
  name: 'Avalanche',
  symbol: 'AVAX',
  png_symbol: 'PNG',
  mainnet: false,
  logo: 'https://static.debank.com/image/chain/logo_url/eth/42ba589cd077e7bdd97db6480b0ff61d.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  rpc_uri: 'https://api.avax-test.network/ext/bc/C/rpc',
  contracts: {
    png: '0x83080D4b5fC60e22dFFA8d14AD3BB41Dde48F199',
    factory: '0xE4A575550C2b460d2307b82dCd7aFe84AD1484dd',
    router: '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921',
    wrapped_native_token: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  }
}

export const BOBA_MAINNET: Chain = {
  id: 'boba_mainnet',
  chain_id: 288,
  name: 'Boba',
  symbol: 'BOBA',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/boba/e43d79cd8088ceb3ea3e4a240a75728f.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://mainnet.boba.network',
}

export const BITTORRENT_MAINNET: Chain = {
  id: 'bittorrent_mainnet',
  chain_id: 1029,
  name: 'BitTorrent',
  symbol: 'BTT',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/btt/2130a8d57ff2a0f3d50a4ec9432897c6.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://pre-rpc.bt.io/',
}

export const BSC_MAINNET: Chain = {
  id: 'bsc_mainnet',
  chain_id: 56,
  name: 'Binance',
  symbol: 'BSC',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/bsc/7c87af7b52853145f6aa790d893763f1.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://bsc-dataseed.binance.org/',
}

export const BSC_TESTNET: Chain = {
  id: 'bsc_testnet',
  chain_id: 97,
  name: 'Binance',
  symbol: 'BSC',
  mainnet: false,
  logo: 'https://static.debank.com/image/chain/logo_url/bsc/7c87af7b52853145f6aa790d893763f1.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
}

export const CELO_MAINNET: Chain = {
  id: 'celo_mainnet',
  chain_id: 42220,
  name: 'Celo',
  symbol: 'CELO',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/celo/41da5c1d3c0945ae822a1f85f02c76cf.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://forno.celo.org/',
}

export const CRONOS_MAINNET: Chain = {
  id: 'cronos_mainnet',
  chain_id: 25,
  name: 'Cronos',
  symbol: 'CRO',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/cro/44f784a1f4c0ea7d26d00acabfdf0028.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://evm-cronos.crypto.org/',
}

export const CRONOS_TESTNET: Chain = {
  id: 'cronos_testnet',
  chain_id: 338,
  name: 'Cronos',
  symbol: 'CRO',
  mainnet: false,
  logo: 'https://static.debank.com/image/chain/logo_url/cro/44f784a1f4c0ea7d26d00acabfdf0028.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://cronos-testnet-3.crypto.org:8545/',
}

export const COSTON_TESTNET: Chain = {
  id: 'coston_testnet',
  chain_id: 16,
  name: 'Coston',
  symbol: 'cFLR',
  mainnet: false,
  logo: '',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://coston-api.flare.network/ext/bc/C/rpc',
}

export const EVMOS_TESTNET: Chain = {
  id: 'evmos_testnet',
  chain_id: 0,
  name: 'EVMOS Testnet',
  symbol: 'EVMOS',
  mainnet: false,
  logo: '',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: '',
}

export const EVMOS_MAINNET: Chain = {
  id: 'evmos_mainnet',
  chain_id: 9001,
  name: 'EVMOS',
  symbol: 'EVMOS',
  mainnet: true,
  logo: '',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://ethereum.rpc.evmos.dev',
}

export const FANTOM_MAINNET: Chain = {
  id: 'fantom_mainnet',
  chain_id: 250,
  name: 'Fantom',
  symbol: 'FTM',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/ftm/700fca32e0ee6811686d72b99cc67713.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://rpc.ftm.tools/',
}

export const FANTOM_TESTNET: Chain = {
  id: 'fantom_testnet',
  chain_id: 0xfa2,
  name: 'Fantom',
  symbol: 'FTM',
  mainnet: false,
  logo: 'https://static.debank.com/image/chain/logo_url/ftm/700fca32e0ee6811686d72b99cc67713.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://rpc.testnet.fantom.network/',
}

export const FUSE_MAINNET: Chain = {
  id: 'fuse_mainnet',
  chain_id: 0x7a,
  name: 'Fuse',
  symbol: 'FUSE',
  mainnet: true,
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://rpc.fuse.io',
}

export const HARMONY_MAINNET: Chain = {
  id: 'harmony_mainnet',
  chain_id: 1666600000,
  name: 'Harmony',
  symbol: 'ONE',
  mainnet: true,
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://api.harmony.one',
}

export const HARMONY_TESTNET: Chain = {
  id: 'harmony_testnet',
  chain_id: 1666700000,
  name: 'Harmony',
  symbol: 'ONE',
  mainnet: false,
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://api.s0.b.hmny.io',
}

export const HECO_MAINNET: Chain = {
  id: 'heco_mainnet',
  chain_id: 128,
  name: 'Heco',
  symbol: 'HECO',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/heco/db5152613c669e0cc8624d466d6c94ea.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://http-mainnet.hecochain.com',
}

export const KLAYTN_MAINNET: Chain = {
  id: 'klaytn_mainnet',
  chain_id: 8217,
  name: 'Klaytn',
  symbol: 'KLAY',
  mainnet: true,
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://kaikas.cypress.klaytn.net:8651',
}

export const METIS_MAINNET: Chain = {
  id: 'metis_mainnet',
  chain_id: 1088,
  name: 'Metis',
  symbol: 'METIS',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/metis/b289da32db4d860ebf6fb46a6e41dcfc.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://andromeda.metis.io/?owner=1088',
}

export const MOONRIVER_MAINNET: Chain = {
  id: 'moonriver_mainnet',
  chain_id: 1285,
  name: 'Moonriver',
  symbol: 'MOVR',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/movr/4b0de5a711b437f187c0d0f15cc0398b.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://rpc.moonriver.moonbeam.network',
}

export const MOONBEAM_MAINNET: Chain = {
  id: 'moonbeam_mainnet',
  chain_id: 1284,
  name: 'Moonbeam',
  symbol: 'MOBM',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/mobm/a8442077d76b258297181c3e6eb8c9cc.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://rpc.api.moonbeam.network',
}

export const MOONBEAM_MOONBASE: Chain = {
  id: 'moonbeam_moonbase',
  chain_id: 1287,
  name: 'Moonbase',
  symbol: 'MOONBASE',
  mainnet: false,
  logo: 'https://static.debank.com/image/chain/logo_url/mobm/a8442077d76b258297181c3e6eb8c9cc.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://rpc.api.moonbase.moonbeam.network',
}

export const OEC_MAINNET: Chain = {
  id: 'oec_mainnet',
  chain_id: 66,
  name: 'OEC',
  symbol: 'OKT',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/okt/1228cd92320b3d33769bd08eecfb5391.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://exchainrpc.okex.org',
}

export const OP_MAINNET: Chain = {
  id: 'op_mainnet',
  chain_id: 10,
  name: 'Optimism',
  symbol: 'OP',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/op/01ae734fe781c9c2ae6a4cc7e9244056.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://mainnet.optimism.io',
}

export const POLYGON_MAINNET: Chain = {
  id: 'polygon_mainnet',
  chain_id: 137,
  name: 'Polygon',
  symbol: 'MATIC',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/matic/d3d807aff1a13e9ba51a14ff153d6807.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://polygon-rpc.com/ ',
}

export const POLYGON_MUMBAI: Chain = {
  id: 'polygon_mumbai',
  chain_id: 80001,
  name: 'Polygon',
  symbol: 'MATIC',
  mainnet: false,
  logo: 'https://static.debank.com/image/chain/logo_url/matic/d3d807aff1a13e9ba51a14ff153d6807.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://rpc-mumbai.maticvigil.com/',
}

export const SONGBIRD_MAINNET: Chain = {
  id: 'songbird_mainnet',
  chain_id: 19,
  name: 'Songbird',
  symbol: 'SGB',
  mainnet: true,
  logo: '',
  pangolin_is_live: false,
  tracked_by_debank: false,
  rpc_uri: 'https://sgb.ftso.com.au/ext/bc/C/rpc',
}

export const WAGMI_FUJI_SUBNET: Chain = {
  id: 'wagmi_fuji_subnet',
  chain_id: 11111,
  name: 'Wagmi',
  symbol: 'WGMI',
  mainnet: true,
  pangolin_is_live: true,
  tracked_by_debank: false,
  rpc_uri: 'https://api.trywagmi.xyz/rpc',
  contracts: {
    png: '0x68e3D48a023524d2641710B5dE70200627a0447f',
    factory: '0xf4C589029be33cc4e4056B125794B35A2dF23136',
    router: '0x2a496ec9e9bE22e66C61d4Eb9d316beaEE31A77b',
    wrapped_native_token: '0x25dbCAb8709E6222d74a56bD0184fc41439806CE',
    local_multisig: '0xAF5D473b3f8F96A5B21c6bbB97e09b491335acb9',
    community_treasury: '0x2572ECa2be804f7799e3f3Ef1D1db60F512a0Ae3',
    treasury_vester: '0x630CC51306B1E2cf149B7F7a15F78bCD006A5D65',
    mini_chef: '0x688d21b0B8Dc35971AF58cFF1F7Bf65639937860',
    airdrop: '0x5610E572c9f2a10BFd15861061F8B1Fe75e05b23',
    timelock: '0x86Ed0a92E38a176b193C8c1bd43e5b34Fa160840',
    revenue_distributor: "0x1fa76B9c58A7c06fA21BaAfc311B33C600B120e5",
    fee_collector: "0xF3861Acb8061A70499DC85c4a6aA9E934C83049f",
    staking: [
      {
        address: '0x3a6e244678f392638876A92DAAa3C56e02dC1080',
        active: true,
        reward_token: '0x68e3D48a023524d2641710B5dE70200627a0447f',
      }
    ]
  }
}

export const XDAI_MAINNET: Chain = {
  id: 'xdai_mainnet',
  chain_id: 100,
  name: 'Gnosis',
  symbol: 'XDAI',
  mainnet: true,
  logo: 'https://static.debank.com/image/chain/logo_url/xdai/8b5320523b30bd57a388d1bcc775acd5.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  rpc_uri: 'https://rpc.xdaichain.com/',
}

export const CHAINS: Chain[] = [
  ETHEREUM_MAINNET,
  ARBITRUM_MAINNET,
  ARBITRUM_RINKEBY,
  AURORA_MAINNET,
  AURORA_TESTNET,
  AVALANCHE_MAINNET,
  AVALANCHE_FUJI,
  BOBA_MAINNET,
  BITTORRENT_MAINNET,
  BSC_MAINNET,
  BSC_TESTNET,
  COSTON_TESTNET,
  CRONOS_MAINNET,
  CRONOS_TESTNET,
  EVMOS_MAINNET,
  EVMOS_TESTNET,
  FANTOM_MAINNET,
  FANTOM_TESTNET,
  FUSE_MAINNET,
  HARMONY_MAINNET,
  HARMONY_TESTNET,
  HECO_MAINNET,
  KLAYTN_MAINNET,
  METIS_MAINNET,
  MOONRIVER_MAINNET,
  MOONBEAM_MAINNET,
  MOONBEAM_MOONBASE,
  OEC_MAINNET,
  OP_MAINNET,
  POLYGON_MAINNET,
  POLYGON_MUMBAI,
  SONGBIRD_MAINNET,
  WAGMI_FUJI_SUBNET,
  XDAI_MAINNET,
]
