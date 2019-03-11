import get from 'lodash/get'

import formatter from 'libs/formatter'
import carLoans from './car-loans'

const attributes = {
  'car-loans': carLoans,
}

export default attributes

export const pull = (vertical, category) => {
  return get(attributes, `${vertical}.${category}`, [])
}

export const getValue = (attribute, product, context) => {
  const { getter, formatter: format } = attribute
  if (!getter) return '-'
  return formatter(getter(product, context), format)
}
