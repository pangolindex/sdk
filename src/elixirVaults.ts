export interface ElixirVaultProvider {
  id: string
  name: string
  logo: string
  description: string
}

export const DEFIEDGE: ElixirVaultProvider = {
  id: 'defiedge',
  name: 'DefiEdge',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/elixirVaults/DefiEdge.png',
  description:
    "Optimize your liquidity management with DeFiEdge's Automated Liquidity Optimization (ALO) solution. Designed to manage both narrow and wide ranges within a single strategy. ALO dynamically allocates liquidity in response to market volatility and fluctuations, aiming for consistent returns and reduced impermanent loss."
}

export const ICHI: ElixirVaultProvider = {
  id: 'ichi',
  name: 'Ichi',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/elixirVaults/Ichi.png',
  description: ''
}
