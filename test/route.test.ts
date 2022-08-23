import { Token, WAVAX, ChainId, Pair, TokenAmount, Route, CAVAX } from '../src'

describe('Route', () => {
  const CAVAX_AVALANCHE = CAVAX[ChainId.AVALANCHE]
  const token0 = new Token(ChainId.AVALANCHE, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(ChainId.AVALANCHE, '0x0000000000000000000000000000000000000002', 18, 't1')
  const weth = WAVAX[ChainId.AVALANCHE]
  const pair_0_1 = new Pair(new TokenAmount(token0, '100'), new TokenAmount(token1, '200'), ChainId.AVALANCHE)
  const pair_0_weth = new Pair(new TokenAmount(token0, '100'), new TokenAmount(weth, '100'), ChainId.AVALANCHE)
  const pair_1_weth = new Pair(new TokenAmount(token1, '175'), new TokenAmount(weth, '100'), ChainId.AVALANCHE)

  it('constructs a path from the tokens', () => {
    const route = new Route([pair_0_1], token0, token1)
    expect(route.pools).toEqual([pair_0_1])
    expect(route.path).toEqual([token0, token1])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(token1)
    expect(route.chainId).toEqual(ChainId.AVALANCHE)
  })

  it('can have a token as both input and output', () => {
    const route = new Route([pair_0_weth, pair_0_1, pair_1_weth], weth, weth)
    expect(route.pools).toEqual([pair_0_weth, pair_0_1, pair_1_weth])
    expect(route.input).toEqual(weth)
    expect(route.output).toEqual(weth)
  })

  it('supports ether input', () => {
    const route = new Route([pair_0_weth], CAVAX_AVALANCHE, token0)
    expect(route.pools).toEqual([pair_0_weth])
    expect(route.input).toEqual(CAVAX_AVALANCHE)
    expect(route.output).toEqual(token0)
  })

  it('supports ether output', () => {
    const route = new Route([pair_0_weth], token0, CAVAX_AVALANCHE)
    expect(route.pools).toEqual([pair_0_weth])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(CAVAX_AVALANCHE)
  })
})
