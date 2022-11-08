export interface Bridge {
  id: string
  name: string
  logo: string
  aggregator_address: string
  lim: string
  affiliate: string
  fee: number
}

export const THORSWAP: Bridge = {
  id: 'thorswap',
  name: 'ThorSwap',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/thorchain.png',
  aggregator_address: '0x7a68c37D8AFA3078f3Ad51D98eA23Fe57a8Ae21a',
  lim: '100001618',
  affiliate: 'thor1h2hf0txuzdl2hedx9epcqc6zf65aldk4ckpwcw',
  fee: 10
}

//TODO: edit this
export const LIFI: Bridge = {
  id: 'lifi',
  name: 'LI.FI',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/lifi.png',
  aggregator_address: '0x7a68c37D8AFA3078f3Ad51D98eA23Fe57a8Ae21a',
  lim: '100001618',
  affiliate: 'thor1h2hf0txuzdl2hedx9epcqc6zf65aldk4ckpwcw',
  fee: 10
}

//TODO: edit this
export const SQUID: Bridge = {
  id: 'squid',
  name: 'Squid',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/bridges/lifi.png',
  aggregator_address: '0x7a68c37D8AFA3078f3Ad51D98eA23Fe57a8Ae21a',
  lim: '100001618',
  affiliate: 'thor1h2hf0txuzdl2hedx9epcqc6zf65aldk4ckpwcw',
  fee: 10
}

export const BRIDGES: Bridge[] = [LIFI, THORSWAP, SQUID]
