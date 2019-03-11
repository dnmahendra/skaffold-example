import forIn from 'lodash/forIn'

const paramTypes = {
  page: parseInt,
  pageSize: parseInt,
  borrowAmount: parseInt,
  loanTerm: parseInt,
}

export const transform = (params) => {
  forIn(params, (value, key) => {
    if (paramTypes[key]) {
      params[key] = paramTypes[key](value)
    }
  })
  return params
}
