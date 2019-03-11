import get from 'lodash/get'

import { decorate } from 'decorators'
import components from '../components'

export const renderAttribute = (attribute, product) => {
  const { component } = attribute
  const Component = components[component]
  if (!Component) {
    return attribute.key
  }
  return <Component attribute={attribute} product={product} />
}

const verticalKeyMap = {
  'car-loans': 'carLoans',
}

export const extract = (data, verticalSlug) => {
  return {
    products: get(data, `${verticalKeyMap[verticalSlug]}.list`, []).map(product => decorate(product, verticalSlug)),
    meta: get(data, `${verticalKeyMap[verticalSlug]}.meta`, {}),
    hasMore: get(data, `${verticalKeyMap[verticalSlug]}.hasMore`),
  }
}
