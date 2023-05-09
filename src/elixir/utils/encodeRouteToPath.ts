import { pack } from '@ethersproject/solidity'
import { Token } from '../../entities'
import { ElixirPool, ElixirRoute } from '../entities'

/**
 * Converts a route to a hex encoded path
 * @param route the v3 path to convert to an encoded path
 * @param exactOutput whether the route should be encoded in reverse, for making exact output swaps
 */
export function encodeRouteToPath(route: ElixirRoute, exactOutput: boolean): string {
  const firstInputToken: Token = route.inputWrapped

  const { path, types } = route.pools.reduce(
    (
      { inputToken, path, types }: { inputToken: Token; path: (string | number)[]; types: string[] },
      pool: ElixirPool,
      index
    ): { inputToken: Token; path: (string | number)[]; types: string[] } => {
      const outputToken: Token = pool.token0.equals(inputToken) ? pool.token1 : pool.token0
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ['address', 'uint24', 'address'],
          path: [inputToken.address, pool.fee, outputToken.address]
        }
      } else {
        return {
          inputToken: outputToken,
          types: [...types, 'uint24', 'address'],
          path: [...path, pool.fee, outputToken.address]
        }
      }
    },
    { inputToken: firstInputToken, path: [], types: [] }
  )

  return exactOutput ? pack(types.reverse(), path.reverse()) : pack(types, path)
}
