export interface Bridge {
  id: string
  name: string
  logo: string
  aggregator_address: string
  affiliate: string
  fee: number
}

export interface BridgePartner {
  name: string
  logo: string
}

export const THORSWAP: Bridge = {
  id: 'thorswap',
  name: 'ThorSwap',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/Thorchain.svg',
  aggregator_address: '0x7a68c37D8AFA3078f3Ad51D98eA23Fe57a8Ae21a',
  affiliate: 'thor1h2hf0txuzdl2hedx9epcqc6zf65aldk4ckpwcw',
  fee: 10
}

export const LIFI: Bridge = {
  id: 'lifi',
  name: 'LI.FI',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/LiFi.svg',
  aggregator_address: '',
  affiliate: '',
  fee: 0
}

export const SQUID: Bridge = {
  id: 'squid',
  name: 'Squid',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/Squid.svg',
  aggregator_address: '',
  affiliate: '',
  fee: 0
}

export const RANGO: Bridge = {
  id: 'rango',
  name: 'Rango',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/Rango.svg',
  aggregator_address: '',
  affiliate: '',
  fee: 0
}

export const BRIDGES: Bridge[] = [LIFI, SQUID, RANGO]

export const BRIDGE_PARTNERS: BridgePartner[] = [
  {
    name: 'Squid',
    logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/Squid.svg'
  },
  {
    name: 'Axelar',
    logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/Axelar.svg'
  },
  {
    name: 'Thorswap',
    logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/THORSwap.svg'
  },
  {
    name: 'Li.Fi',
    logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/LiFi.svg'
  },
  {
    name: 'Rango',
    logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/Rango.svg'
  }
]
