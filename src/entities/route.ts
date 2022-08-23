import { ChainId } from '../chains'
import invariant from 'tiny-invariant'
import { Currency, CAVAX } from './currency'
import { Token, WAVAX } from './token'
import { Pool } from './pools/pool'
import { Price } from './fractions/price'

export class Route {
  public readonly pools: Pool[]
  public readonly path: Token[]
  public readonly input: Currency
  public readonly output: Currency
  public readonly midPrice: Price

  public constructor(pools: Pool[], input: Currency, output: Currency, hops: Token[] = []) {
    invariant(pools.length > 0, 'PAIRS')
    invariant(pools.every(pool => pool.tokenCount === 2) || hops.length === pools.length - 1, 'HOPS')
    const chainId = pools[0].chainId
    invariant(
      pools.every(pool => pool.chainId === chainId),
      'CHAIN_IDS'
    )
    if (input === CAVAX[chainId]) {
      invariant(pools[0].involvesToken(WAVAX[chainId]), 'INPUT')
    }
    if (output === CAVAX[chainId]) {
      invariant(pools[pools.length - 1].involvesToken(WAVAX[chainId]), 'OUTPUT')
    }

    const wrappedInput: Token = input instanceof Token ? input : WAVAX[chainId]
    const wrappedOutput: Token = output instanceof Token ? output : WAVAX[chainId]

    const path: Token[] = [wrappedInput]

    for (const [i, pool] of pools.entries()) {
      const inputToken = path[i]
      invariant(pool.involvesToken(inputToken), 'PATH')
      let outputToken: Token
      if (pool.tokenCount === 2) {
        outputToken = inputToken.equals(pool.token(0)) ? pool.token(1) : pool.token(0)
      } else {
        // When a pool has 3+ tokens we need `hops` to guarantee a deterministic path
        outputToken = i === pools.length ? wrappedOutput : hops[i]
        invariant(!inputToken.equals(outputToken), 'DUPLICATE')
        invariant(pool.involvesToken(outputToken), 'PATH')
      }
      path.push(outputToken)
    }

    this.pools = pools
    this.path = path
    this.midPrice = Price.fromRoute(this)
    this.input = input
    this.output = output
  }

  public get chainId(): ChainId {
    return this.pools[0].chainId
  }
}
