import { ChainId, Token, Pair, TokenAmount, WAVAX, Price, CHAINS } from '../src'

describe('Pair', () => {
  const png = new Token(ChainId.AVALANCHE, '0x60781C2586D68229fde47564546784ab3fACA982', 18, 'PNG', 'PNG')
  const _wavax = WAVAX[ChainId.AVALANCHE]

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(() => new Pair(new TokenAmount(png, '100'), new TokenAmount(_wavax, '100'), ChainId.FUJI)).toThrow(
        'CHAIN_MISMATCH'
      )
    })
  })

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(png, _wavax, ChainId.AVALANCHE)).toEqual('0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367')
    })
  })

  const pair1 = new Pair(new TokenAmount(png, '100'), new TokenAmount(_wavax, '101'))
  const pair2 = new Pair(new TokenAmount(_wavax, '101'), new TokenAmount(png, '100'))

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(pair1.token0).toEqual(png)
      expect(pair2.token0).toEqual(png)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(pair1.token1).toEqual(_wavax)
      expect(pair2.token1).toEqual(_wavax)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(pair1.reserve0).toEqual(new TokenAmount(png, '100'))
      expect(pair1.reserve0).toEqual(new TokenAmount(png, '100'))
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(pair1.reserve1).toEqual(new TokenAmount(_wavax, '101'))
      expect(pair1.reserve1).toEqual(new TokenAmount(_wavax, '101'))
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(pair1.token0Price).toEqual(new Price(png, _wavax, '100', '101'))
      expect(pair2.token0Price).toEqual(new Price(png, _wavax, '100', '101'))
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(pair1.token1Price).toEqual(new Price(_wavax, png, '101', '100'))
      expect(pair2.token1Price).toEqual(new Price(_wavax, png, '101', '100'))
    })
  })

  describe('#priceOf', () => {
    it('returns price of token in terms of other token', () => {
      expect(pair1.priceOf(png, _wavax)).toEqual(pair1.token0Price)
      expect(pair2.priceOf(png, _wavax)).toEqual(pair1.token0Price)
    })

    it('returns price of token in terms of other token', () => {
      expect(pair1.priceOf(_wavax, png)).toEqual(pair2.token1Price)
      expect(pair2.priceOf(_wavax, png)).toEqual(pair2.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair1.priceOf(WAVAX[ChainId.FUJI], png)).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(pair1.reserveOfToken(png)).toEqual(new TokenAmount(png, '100'))
      expect(pair1.reserveOfToken(_wavax)).toEqual(new TokenAmount(_wavax, '101'))
    })

    it('throws if not in the pair', () => {
      expect(() => pair1.reserveOfToken(WAVAX[ChainId.FUJI])).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(pair1.chainId).toEqual(ChainId.AVALANCHE)
      expect(pair2.chainId).toEqual(ChainId.AVALANCHE)
    })
  })
  describe('#involvesToken', () => {
    expect(pair1.involvesToken(png)).toEqual(true)
    expect(pair2.involvesToken(_wavax)).toEqual(true)
    expect(pair1.involvesToken(WAVAX[ChainId.FUJI])).toEqual(false)
  })
})

describe('Hedera Pair', () => {
  const hedera = CHAINS[ChainId.HEDERA_TESTNET]
  const PBAR = new Token(
    ChainId.HEDERA_TESTNET,
    hedera.contracts?.png as string,
    8,
    hedera.png_symbol,
    'Pangolin Hedera'
  )
  const WHBAR = WAVAX[ChainId.HEDERA_TESTNET]

  const pair = new Pair(new TokenAmount(PBAR, '100'), new TokenAmount(WHBAR, '100'), ChainId.HEDERA_TESTNET)

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(PBAR, WHBAR, ChainId.HEDERA_TESTNET)).toEqual('0x9DD21FC0e08f895B4289AB163291e637a94fc3aD')
    })
  })

  describe('#decimals', () => {
    it('check if the decimals equal to 0', () => {
      expect(pair.liquidityToken.decimals).toEqual(0)
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(pair.chainId).toEqual(ChainId.HEDERA_TESTNET)
    })
  })
})

describe('Near Pair', () => {
  const near = CHAINS[ChainId.NEAR_TESTNET]
  const PNR = new Token(ChainId.NEAR_TESTNET, near.contracts?.png as string, 24, near.png_symbol, 'Pangolin Near')
  const WNEAR = WAVAX[ChainId.NEAR_TESTNET]

  const pair = new Pair(new TokenAmount(PNR, '100'), new TokenAmount(WNEAR, '100'), ChainId.NEAR_TESTNET)

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(PNR, WNEAR, ChainId.NEAR_TESTNET)).toEqual('png-token-v1.testnet-wrap.testnet')
    })
  })

  describe('#decimals', () => {
    it('check if the decimals equal to 24', () => {
      expect(pair.liquidityToken.decimals).toEqual(24)
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(pair.chainId).toEqual(ChainId.NEAR_TESTNET)
    })
  })
})
