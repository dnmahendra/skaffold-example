import entityTypes from './entityTypes'

export const verticalArray = [
  {
    verticalKey: 'carLoans',
    entityType: entityTypes.CARLOAN,
    name: 'Car Loans',
    productType: 'carloan',
    productTypeCapitals: 'CarLoan',
    slug: 'car-loans',
  },
]

const verticalNames = {}
verticalArray.forEach((vertical) => {
  Object.values(vertical).forEach((verticalName) => {
    verticalNames[verticalName] = vertical
    verticalNames[verticalName.toLowerCase()] = vertical
  })
})

/* Give this function a string with a vertical in any format and it will give you
   back an object with attributes for every way that vertical name can be formatted */
export function getVertical (name) {
  return verticalNames[name]
}
