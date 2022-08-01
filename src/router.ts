import { TradeType, ZERO, ZERO_ADDRESS } from './constants'
import invariant from 'tiny-invariant'
import { validateAndParseAddress } from './utils'
import { CurrencyAmount, CAVAX, Percent, Trade } from './entities'

/**
 * Options for producing the arguments to send call to the router.
 */
export interface TradeOptions {
  /**
   * How much the execution price is allowed to move unfavorably from the trade execution price.
   */
  allowedSlippage: Percent
  /**
   * How long the swap is valid until it expires, in seconds.
   * This will be used to produce a `deadline` parameter which is computed from when the swap call parameters
   * are generated.
   */
  ttl: number
  /**
   * The account that should receive the output of the swap.
   */
  recipient: string

  /**
   * Whether any of the tokens in the path are fee on transfer tokens, which should be handled with special methods
   */
  feeOnTransfer?: boolean
}

export interface TradeOptionsDeadline extends Omit<TradeOptions, 'ttl'> {
  /**
   * When the transaction expires.
   * This is an atlernate to specifying the ttl, for when you do not want to use local time.
   */
  deadline: number
}

/**
 * The parameters to use in the call to the Uniswap V2 Router to execute a trade.
 */
export interface SwapParameters {
  /**
   * The method to call on the Uniswap V2 Router.
   */
  methodName: string
  /**
   * The arguments to pass to the method, all hex encoded.
   */
  args: (string | string[])[]
  /**
   * The amount of wei to send in hex.
   */
  value: string
}

function toHex(currencyAmount: CurrencyAmount) {
  return `0x${currencyAmount.raw.toString(16)}`
}

const ZERO_HEX = '0x0'

/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */
export abstract class Router {
  /**
   * Cannot be constructed.
   */
  private constructor() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  public static swapCallParameters(trade: Trade, options: TradeOptions | TradeOptionsDeadline): SwapParameters {
    const chainId = trade.chainId
    const etherIn = trade.inputAmount.currency === CAVAX[chainId]
    const etherOut = trade.outputAmount.currency === CAVAX[chainId]
    // the router does not support both ether in and out
    invariant(!(etherIn && etherOut), 'ETHER_IN_OUT')
    invariant(!('ttl' in options) || options.ttl > 0, 'TTL')

    const feeToDaaS: string = validateAndParseAddress(trade.feeTo)
    const isDaaS = Boolean(feeToDaaS !== ZERO_ADDRESS && !trade.fee.equalTo(ZERO))

    const to: string = validateAndParseAddress(options.recipient)
    const amountIn: string = toHex(trade.maximumAmountIn(options.allowedSlippage))
    const amountOut: string = toHex(trade.minimumAmountOut(options.allowedSlippage))
    const path: string[] = trade.route.path.map(token => token.address)
    const deadline =
      'ttl' in options
        ? `0x${(Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16)}`
        : `0x${options.deadline.toString(16)}`

    const useFeeOnTransfer = Boolean(options.feeOnTransfer)

    let methodName: string
    let args: (string | string[])[]
    let value: string
    switch (trade.tradeType) {
      case TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer
            ? 'swapExactAVAXForTokensSupportingFeeOnTransferTokens'
            : 'swapExactAVAXForTokens'
          args = isDaaS ? [amountOut, path, to, deadline, feeToDaaS] : [amountOut, path, to, deadline]
          value = amountIn
        } else if (etherOut) {
          methodName = useFeeOnTransfer
            ? 'swapExactTokensForAVAXSupportingFeeOnTransferTokens'
            : 'swapExactTokensForAVAX'
          args = isDaaS
            ? [amountIn, amountOut, path, to, deadline, feeToDaaS]
            : [amountIn, amountOut, path, to, deadline]
          value = ZERO_HEX
        } else {
          methodName = useFeeOnTransfer
            ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens'
            : 'swapExactTokensForTokens'
          args = isDaaS
            ? [amountIn, amountOut, path, to, deadline, feeToDaaS]
            : [amountIn, amountOut, path, to, deadline]
          value = ZERO_HEX
        }
        break
      case TradeType.EXACT_OUTPUT:
        invariant(!useFeeOnTransfer, 'EXACT_OUT_FOT')
        if (etherIn) {
          methodName = 'swapAVAXForExactTokens'
          args = isDaaS ? [amountOut, path, to, deadline, feeToDaaS] : [amountOut, path, to, deadline]
          value = amountIn
        } else if (etherOut) {
          methodName = 'swapTokensForExactAVAX'
          args = isDaaS
            ? [amountOut, amountIn, path, to, deadline, feeToDaaS]
            : [amountOut, amountIn, path, to, deadline]
          value = ZERO_HEX
        } else {
          methodName = 'swapTokensForExactTokens'
          args = isDaaS
            ? [amountOut, amountIn, path, to, deadline, feeToDaaS]
            : [amountOut, amountIn, path, to, deadline]
          value = ZERO_HEX
        }
        break
    }
    return {
      methodName,
      args,
      value
    }
  }
}
