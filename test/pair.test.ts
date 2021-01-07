import { ChainId, Token, Pair, TokenAmount, WAVAX, Price } from '../src'

describe('Pair', () => {

  const DAS = new Token(ChainId.FUJI, '0x75aF0F9CD8831050812706B81316127D30271DCf', 18, 'DAS', 'Das Coin');
  const CON = new Token(ChainId.FUJI, '0x7dA7F13653436345756D93c45A09066bf664FbB3', 18, 'CON', 'Connor Coin');

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(() => new Pair(new TokenAmount(DAS, '100'), new TokenAmount(WAVAX[ChainId.FUJI], '100'), ChainId.FUJI)).toThrow(
        'CHAIN_IDS'
      )
    })
  })

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      //expect(Pair.getAddress(DAS, CON)).toEqual('0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5')
      expect(Pair.getAddress(DAS, CON, ChainId.AVALANCHE)).toEqual('0xaf5fdF7De60779DA4409498DfdfA3803984e8536')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.FUJI).token0).toEqual(CON)
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '100'), ChainId.FUJI).token0).toEqual(CON)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.FUJI).token1).toEqual(DAS)
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '100'), ChainId.FUJI).token1).toEqual(DAS)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '101'), ChainId.FUJI).reserve0).toEqual(
        new TokenAmount(CON, '101')
      )
      expect(new Pair(new TokenAmount(CON, '101'), new TokenAmount(DAS, '100'), ChainId.FUJI).reserve0).toEqual(
        new TokenAmount(CON, '101')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '101'), ChainId.FUJI).reserve1).toEqual(
        new TokenAmount(DAS, '100')
      )
      expect(new Pair(new TokenAmount(CON, '101'), new TokenAmount(DAS, '100'), ChainId.FUJI).reserve1).toEqual(
        new TokenAmount(DAS, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(DAS, '101'), new TokenAmount(CON, '100'), ChainId.FUJI).token0Price).toEqual(
        new Price(CON, DAS, '100', '101')
      )
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '101'), ChainId.FUJI).token0Price).toEqual(
        new Price(CON, DAS, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(DAS, '101'), new TokenAmount(CON, '100'), ChainId.FUJI).token1Price).toEqual(
        new Price(DAS, CON, '101', '100')
      )
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '101'), ChainId.FUJI).token1Price).toEqual(
        new Price(DAS, CON, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(DAS, '101'), new TokenAmount(CON, '100'), ChainId.FUJI)
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(CON)).toEqual(pair.token0Price)
      expect(pair.priceOf(DAS)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WAVAX[ChainId.FUJI])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '101'), ChainId.FUJI).reserveOf(DAS)).toEqual(
        new TokenAmount(DAS, '100')
      )
      expect(new Pair(new TokenAmount(CON, '101'), new TokenAmount(DAS, '100'), ChainId.FUJI).reserveOf(DAS)).toEqual(
        new TokenAmount(DAS, '100')
      )
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(CON, '101'), new TokenAmount(DAS, '100'), ChainId.FUJI).reserveOf(WAVAX[ChainId.FUJI])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.FUJI).chainId).toEqual(ChainId.FUJI)
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '100'), ChainId.FUJI).chainId).toEqual(ChainId.FUJI)
    })
  })
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.FUJI).involvesToken(DAS)).toEqual(true)
    expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.FUJI).involvesToken(CON)).toEqual(true)
    expect(
      new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.FUJI).involvesToken(WAVAX[ChainId.FUJI])
    ).toEqual(false)
  })
})
