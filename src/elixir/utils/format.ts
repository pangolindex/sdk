import { CurrencyAmount, NumberType, Price } from '../../index'

import { Nullish } from '../types'

const FIVE_DECIMALS_NO_TRAILING_ZEROS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumFractionDigits: 5
})

const FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumFractionDigits: 5,
  minimumFractionDigits: 2
})

const FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN_NO_COMMAS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumFractionDigits: 5,
  minimumFractionDigits: 2,
  useGrouping: false
})

const THREE_DECIMALS_NO_TRAILING_ZEROS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumFractionDigits: 3,
  minimumFractionDigits: 0
})

const THREE_DECIMALS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumFractionDigits: 3,
  minimumFractionDigits: 3
})

const THREE_DECIMALS_USD = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumFractionDigits: 3,
  minimumFractionDigits: 3,
  currency: 'USD',
  style: 'currency'
})

const TWO_DECIMALS_NO_TRAILING_ZEROS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumFractionDigits: 2
})

const TWO_DECIMALS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
})

const TWO_DECIMALS_USD = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  currency: 'USD',
  style: 'currency'
})

const SHORTHAND_TWO_DECIMALS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'compact',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'compact',
  maximumFractionDigits: 2
})

const SHORTHAND_FIVE_DECIMALS_NO_TRAILING_ZEROS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'compact',
  maximumFractionDigits: 5
})

const SHORTHAND_USD_TWO_DECIMALS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'compact',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currency: 'USD',
  style: 'currency'
})

const SHORTHAND_USD_ONE_DECIMAL = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'compact',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  currency: 'USD',
  style: 'currency'
})

const SIX_SIG_FIGS_TWO_DECIMALS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumSignificantDigits: 6,
  minimumSignificantDigits: 3,
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
})

const SIX_SIG_FIGS_NO_COMMAS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumSignificantDigits: 6,
  useGrouping: false
})

const SIX_SIG_FIGS_TWO_DECIMALS_NO_COMMAS = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  maximumSignificantDigits: 6,
  minimumSignificantDigits: 3,
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  useGrouping: false
})

const THREE_SIG_FIGS_USD = new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: 'standard',
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 3,
  currency: 'USD',
  style: 'currency'
})

type Format = Intl.NumberFormat | string

// each rule must contain either an `upperBound` or an `exact` value.
// upperBound => number will use that formatter as long as it is < upperBound
// exact => number will use that formatter if it is === exact
type FormatterRule =
  | { upperBound?: undefined; exact: number; formatter: Format }
  | { upperBound: number; exact?: undefined; formatter: Format }

// these formatter objects dictate which formatter rule to use based on the interval that
// the number falls into. for example, based on the rule set below, if your number
// falls between 1 and 1e6, you'd use TWO_DECIMALS as the formatter.
const tokenNonTxFormatter: FormatterRule[] = [
  { exact: 0, formatter: '0' },
  { upperBound: 0.001, formatter: '<0.001' },
  { upperBound: 1, formatter: THREE_DECIMALS },
  { upperBound: 1e6, formatter: TWO_DECIMALS },
  { upperBound: 1e15, formatter: SHORTHAND_TWO_DECIMALS },
  { upperBound: Infinity, formatter: '>999T' }
]

const tokenTxFormatter: FormatterRule[] = [
  { exact: 0, formatter: '0' },
  { upperBound: 0.00001, formatter: '<0.00001' },
  { upperBound: 1, formatter: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN },
  { upperBound: 10000, formatter: SIX_SIG_FIGS_TWO_DECIMALS },
  { upperBound: Infinity, formatter: TWO_DECIMALS }
]

const swapTradeAmountFormatter: FormatterRule[] = [
  { exact: 0, formatter: '0' },
  { upperBound: 0.1, formatter: SIX_SIG_FIGS_NO_COMMAS },
  { upperBound: 1, formatter: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN_NO_COMMAS },
  { upperBound: Infinity, formatter: SIX_SIG_FIGS_TWO_DECIMALS_NO_COMMAS }
]

const fiatTokenDetailsFormatter: FormatterRule[] = [
  { exact: 0, formatter: '$0.00' },
  { upperBound: 0.00000001, formatter: '<$0.00000001' },
  { upperBound: 0.1, formatter: THREE_SIG_FIGS_USD },
  { upperBound: 1.05, formatter: THREE_DECIMALS_USD },
  { upperBound: 1e6, formatter: TWO_DECIMALS_USD },
  { upperBound: Infinity, formatter: SHORTHAND_USD_TWO_DECIMALS }
]

const fiatTokenPricesFormatter: FormatterRule[] = [
  { exact: 0, formatter: '$0.00' },
  { upperBound: 0.00000001, formatter: '<$0.00000001' },
  { upperBound: 0.1, formatter: THREE_SIG_FIGS_USD }, // Round to 3 significant figures, show significant trailing zeros
  { upperBound: 1.05, formatter: THREE_DECIMALS_USD }, // Round to 3 decimal places, show significant trailing zeros
  { upperBound: 1_000_000, formatter: TWO_DECIMALS_USD }, // Round to 2 decimal places
  { upperBound: 1_000_000_000_000_000, formatter: SHORTHAND_USD_TWO_DECIMALS }, // Use M/B/T abbreviations
  { upperBound: Infinity, formatter: '>$999T' } // Use M/B/T abbreviations
]

const fiatTokenStatsFormatter: FormatterRule[] = [
  // if token stat value is 0, we probably don't have the data for it, so show '-' as a placeholder
  { exact: 0, formatter: '-' },
  { upperBound: 0.01, formatter: '<$0.01' },
  { upperBound: 1000, formatter: TWO_DECIMALS_USD },
  { upperBound: Infinity, formatter: SHORTHAND_USD_ONE_DECIMAL }
]

const fiatGasPriceFormatter: FormatterRule[] = [
  { upperBound: 0.01, formatter: '<$0.01' },
  { upperBound: 1e6, formatter: TWO_DECIMALS_USD },
  { upperBound: Infinity, formatter: SHORTHAND_USD_TWO_DECIMALS }
]

const fiatTokenQuantityFormatter = [{ exact: 0, formatter: '$0.00' }, ...fiatGasPriceFormatter]

const portfolioBalanceFormatter: FormatterRule[] = [
  { exact: 0, formatter: '$0.00' },
  { upperBound: Infinity, formatter: TWO_DECIMALS_USD }
]

const ntfTokenFloorPriceFormatterTrailingZeros: FormatterRule[] = [
  { exact: 0, formatter: '0' },
  { upperBound: 0.001, formatter: '<0.001' },
  { upperBound: 1, formatter: THREE_DECIMALS },
  { upperBound: 1000, formatter: TWO_DECIMALS },
  { upperBound: 1e15, formatter: SHORTHAND_TWO_DECIMALS },
  { upperBound: Infinity, formatter: '>999T' }
]

const ntfTokenFloorPriceFormatter: FormatterRule[] = [
  { exact: 0, formatter: '0' },
  { upperBound: 0.001, formatter: '<0.001' },
  { upperBound: 1, formatter: THREE_DECIMALS_NO_TRAILING_ZEROS },
  { upperBound: 1000, formatter: TWO_DECIMALS_NO_TRAILING_ZEROS },
  { upperBound: 1e15, formatter: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS },
  { upperBound: Infinity, formatter: '>999T' }
]

const ntfCollectionStatsFormatter: FormatterRule[] = [
  { exact: 0, formatter: '0' },
  { upperBound: 0.00001, formatter: '<0.00001' },
  { upperBound: 1, formatter: FIVE_DECIMALS_NO_TRAILING_ZEROS },
  { upperBound: 1e6, formatter: SIX_SIG_FIGS_NO_COMMAS },
  { upperBound: 1e15, formatter: SHORTHAND_FIVE_DECIMALS_NO_TRAILING_ZEROS },
  { upperBound: Infinity, formatter: '>999T' }
]

const TYPE_TO_FORMATTER_RULES = {
  [NumberType.TokenNonTx]: tokenNonTxFormatter,
  [NumberType.TokenTx]: tokenTxFormatter,
  [NumberType.SwapTradeAmount]: swapTradeAmountFormatter,
  [NumberType.FiatTokenQuantity]: fiatTokenQuantityFormatter,
  [NumberType.FiatTokenDetails]: fiatTokenDetailsFormatter,
  [NumberType.FiatTokenPrice]: fiatTokenPricesFormatter,
  [NumberType.FiatTokenStats]: fiatTokenStatsFormatter,
  [NumberType.FiatGasPrice]: fiatGasPriceFormatter,
  [NumberType.PortfolioBalance]: portfolioBalanceFormatter,
  [NumberType.NFTTokenFloorPrice]: ntfTokenFloorPriceFormatter,
  [NumberType.NFTTokenFloorPriceTrailingZeros]: ntfTokenFloorPriceFormatterTrailingZeros,
  [NumberType.NFTCollectionStats]: ntfCollectionStatsFormatter
}

function getFormatterRule(input: number, type: NumberType) {
  const rules = TYPE_TO_FORMATTER_RULES[type]
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (
      (rule.exact !== undefined && input === rule.exact) ||
      (rule.upperBound !== undefined && input < rule.upperBound)
    ) {
      return rule.formatter
    }
  }

  throw new Error(`formatter for type ${type} not configured correctly`)
}

export function formatNumber(input: Nullish<number>, type: NumberType = NumberType.TokenNonTx, placeholder = '-') {
  if (input === null || input === undefined) {
    return placeholder
  }

  const formatter = getFormatterRule(input, type)
  if (typeof formatter === 'string') return formatter
  return formatter.format(input)
}

export function formatCurrencyAmount(
  amount: Nullish<CurrencyAmount>,
  type: NumberType = NumberType.TokenNonTx,
  placeholder?: string
) {
  return formatNumber(amount ? parseFloat(amount.toSignificant()) : undefined, type, placeholder)
}

export function formatPrice(price: Nullish<Price>, type: NumberType = NumberType.FiatTokenPrice) {
  if (price === null || price === undefined) {
    return '-'
  }

  return formatNumber(parseFloat(price.toSignificant()), type)
}

export function formatDate(date: Date) {
  return date.toLocaleString('en-US', {
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'short', // numeric, 2-digit, long, short, narrow
    hour: 'numeric', // numeric, 2-digit
    minute: 'numeric' // numeric, 2-digit
  })
}

export function formatNumberOrString(price: Nullish<number | string>, type: NumberType) {
  if (price === null || price === undefined) return '-'
  if (typeof price === 'string') return formatNumber(parseFloat(price), type)
  return formatNumber(price, type)
}

export function formatUSDPrice(price: Nullish<number | string>, type: NumberType = NumberType.FiatTokenPrice) {
  return formatNumberOrString(price, type)
}
