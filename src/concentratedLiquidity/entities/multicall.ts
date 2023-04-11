import { Interface } from '@ethersproject/abi'
import IMulticall from '../../abis/IMulticall.json'

export abstract class Multicall {
  public static INTERFACE: Interface = new Interface(IMulticall)

  /**
   * Cannot be constructed.
   */
  private constructor() {}

  public static encodeMulticall(calldatas: string | string[]): string {
    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas]
    }

    return calldatas.length === 1 ? calldatas[0] : Multicall.INTERFACE.encodeFunctionData('multicall', [calldatas])
  }
}
