import get from 'lodash/get'

export const verticalArray = [{
  verticalKey: 'carLoans',
  name: 'Car Loans',
  slug: 'car-loans',
  type: 'carloan',
}]

const verticals = {}
verticalArray.forEach(value => {
  Object.values(value).forEach(key => {
    verticals[key] = value
    verticals[key.toLowerCase()] = value
  })
})

export const getVertical = (key, type) => {
  return type ? get(verticals, `${key}.${type}`, '') : get(verticals, key, {})
}
