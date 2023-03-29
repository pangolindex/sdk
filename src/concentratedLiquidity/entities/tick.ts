import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import { BigintIsh } from '../../constants'
import { TickMath } from '../utils'

export interface TickConstructorArgs {
  index: number
  liquidityGross: BigintIsh
  liquidityNet: BigintIsh
}

export class Tick {
  public readonly index: number
  public readonly liquidityGross: BigintIsh
  public readonly liquidityNet: BigintIsh

  constructor({ index, liquidityGross, liquidityNet }: TickConstructorArgs) {
    invariant(index >= TickMath.MIN_TICK && index <= TickMath.MAX_TICK, 'TICK')
    this.index = index
    this.liquidityGross = JSBI.BigInt(liquidityGross as any)
    this.liquidityNet = JSBI.BigInt(liquidityNet as any)
  }
}
