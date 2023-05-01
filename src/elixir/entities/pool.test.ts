import { Token, TokenAmount } from '../../entities'
import { FeeAmount, TICK_SPACINGS } from '../constants'
import { nearestUsableTick } from '../utils/nearestUsableTick'
import { TickMath } from '../utils/tickMath'
import { ElixirPool } from './pool'
import { encodeSqrtRatioX96 } from '../utils/encodeSqrtRatioX96'
import JSBI from 'jsbi'
import { NEGATIVE_ONE } from '../../constants'

const ONE_ETHER = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))

describe('ElixirPool', () => {
  const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin')
  const DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'DAI Stablecoin')

  describe('#getAddress', () => {
    it('matches an example', () => {
      const result = ElixirPool.getAddress(USDC, DAI, FeeAmount.LOW)
      expect(result).toEqual('0x6c6Bc977E13Df9b0de53b251522280BB72383700')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      let pool = new ElixirPool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96('1', '1'), '0', 0, [])
      expect(pool.token0).toEqual(DAI)
      pool = new ElixirPool(DAI, USDC, FeeAmount.LOW, encodeSqrtRatioX96('1', '1'), '0', 0, [])
      expect(pool.token0).toEqual(DAI)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      let pool = new ElixirPool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96('1', '1'), '0', 0, [])
      expect(pool.token1).toEqual(USDC)
      pool = new ElixirPool(DAI, USDC, FeeAmount.LOW, encodeSqrtRatioX96('1', '1'), '0', 0, [])
      expect(pool.token1).toEqual(USDC)
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(
        new ElixirPool(
          USDC,
          DAI,
          FeeAmount.LOW,
          encodeSqrtRatioX96('101e6', '100e18'),
          '0',
          TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96('101e6', '100e18')),
          []
        ).token0Price.toSignificant(5)
      ).toEqual('1.01')
      expect(
        new ElixirPool(
          DAI,
          USDC,
          FeeAmount.LOW,
          encodeSqrtRatioX96('101e6', '100e18'),
          '0',
          TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96('101e6', '100e18')),
          []
        ).token0Price.toSignificant(5)
      ).toEqual('1.01')
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(
        new ElixirPool(
          USDC,
          DAI,
          FeeAmount.LOW,
          encodeSqrtRatioX96('101e6', '100e18'),
          '0',
          TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96('101e6', '100e18')),
          []
        ).token1Price.toSignificant(5)
      ).toEqual('0.9901')
      expect(
        new ElixirPool(
          DAI,
          USDC,
          FeeAmount.LOW,
          encodeSqrtRatioX96('101e6', '100e18'),
          '0',
          TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96('101e6', '100e18')),
          []
        ).token1Price.toSignificant(5)
      ).toEqual('0.9901')
    })
  })

  describe('#priceOf', () => {
    const pool = new ElixirPool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96('1', '1'), '0', 0, [])
    it('returns price of token in terms of other token', () => {
      expect(pool.priceOf(DAI)).toEqual(pool.token0Price)
      expect(pool.priceOf(USDC)).toEqual(pool.token1Price)
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      let pool = new ElixirPool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96('1', '1'), '0', 0, [])
      expect(pool.chainId).toEqual(1)
      pool = new ElixirPool(DAI, USDC, FeeAmount.LOW, encodeSqrtRatioX96('1', '1'), '0', 0, [])
      expect(pool.chainId).toEqual(1)
    })
  })

  describe('swaps', () => {
    let pool: ElixirPool

    beforeEach(() => {
      pool = new ElixirPool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96('1', '1'), ONE_ETHER, 0, [
        {
          index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[FeeAmount.LOW]),
          liquidityNet: ONE_ETHER,
          liquidityGross: ONE_ETHER
        },
        {
          index: nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[FeeAmount.LOW]),
          liquidityNet: JSBI.multiply(ONE_ETHER, NEGATIVE_ONE),
          liquidityGross: ONE_ETHER
        }
      ])
    })

    describe('#getOutputAmount', () => {
      it('USDC -> DAI', async () => {
        const inputAmount = new TokenAmount(USDC, '100')
        const [outputAmount] = await pool.getOutputAmount(inputAmount)
        expect(outputAmount.token.equals(DAI)).toBe(true)
        expect(outputAmount.quotient).toEqual(JSBI.BigInt(98))
      })

      it('DAI -> USDC', async () => {
        const inputAmount = new TokenAmount(DAI, '100')
        const [outputAmount] = await pool.getOutputAmount(inputAmount)
        expect(outputAmount.token.equals(USDC)).toBe(true)
        expect(outputAmount.quotient).toEqual(JSBI.BigInt(98))
      })
    })

    describe('#getInputAmount', () => {
      it('USDC -> DAI', async () => {
        const outputAmount = new TokenAmount(DAI, '98')
        const [inputAmount] = await pool.getInputAmount(outputAmount)
        expect(inputAmount.token.equals(USDC)).toBe(true)
        expect(inputAmount.quotient).toEqual(JSBI.BigInt(100))
      })

      it('DAI -> USDC', async () => {
        const outputAmount = new TokenAmount(USDC, '98')
        const [inputAmount] = await pool.getInputAmount(outputAmount)
        expect(inputAmount.token.equals(DAI)).toBe(true)
        expect(inputAmount.quotient).toEqual(JSBI.BigInt(100))
      })
    })
  })

  describe('#bigNums', () => {
    let pool: ElixirPool
    const bigNum1 = JSBI.add(JSBI.BigInt(Number.MAX_SAFE_INTEGER), JSBI.BigInt(1))
    const bigNum2 = JSBI.add(JSBI.BigInt(Number.MAX_SAFE_INTEGER), JSBI.BigInt(1))
    beforeEach(() => {
      pool = new ElixirPool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96(bigNum1, bigNum2), ONE_ETHER, 0, [
        {
          index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[FeeAmount.LOW]),
          liquidityNet: ONE_ETHER,
          liquidityGross: ONE_ETHER
        },
        {
          index: nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[FeeAmount.LOW]),
          liquidityNet: JSBI.multiply(ONE_ETHER, NEGATIVE_ONE),
          liquidityGross: ONE_ETHER
        }
      ])
    })

    describe('#priceLimit', () => {
      it('correctly compares two BigIntegers', async () => {
        expect(bigNum1).toEqual(bigNum2)
      })
      it('correctly handles two BigIntegers', async () => {
        const inputAmount = new TokenAmount(USDC, '100')
        const [outputAmount] = await pool.getOutputAmount(inputAmount)
        pool.getInputAmount(outputAmount)
        expect(outputAmount.token.equals(DAI)).toBe(true)
        // if output is correct, function has succeeded
      })
    })
  })
})
