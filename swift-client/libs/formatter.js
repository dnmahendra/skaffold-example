import numeral from 'numeral'
import { Check, Minus } from 'react-feather'

export const currency = (value, options) => {
  return numeral(value).format(options || '$0.[0]a')
}


export default function (value, formatter, options) {
  switch (formatter) {
    case 'currency':
      return currency(value, options)
    case 'boolean':
      return value ? <Check className="check" /> : <Minus className="minus" />
    default:
      return value
  }
}
