import CarLoan from './CarLoan'

const decorators = {
  'car-loans': CarLoan,
}

export const decorate = (product, slug) => {
  if (!product) return product
  const Decorator = decorators[slug]
  if (!Decorator) {
    return product
  }
  return new Decorator(product)
}
