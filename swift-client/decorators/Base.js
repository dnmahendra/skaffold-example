
class Decorator {
  constructor (product) {
    for (const key in product) {
      if (!(key in this)) {
        this[key] = product[key]
      }
    }
    this._product = product
  }

  get isDecorated () {
    return true
  }

  get isMonetized () {
    return !!(this._product.gotoSiteUrl && this._product.gotoSiteEnabled)
  }

  static getEntityType () {
    return null
  }

  /* If this object is stringified, return the product with one extra attribute
    to inform that this can be remade into a decorator */
  toJSON () {
    return Object.assign({}, this._product, { isDecorator: true })
  }

  get applyButtonText () {
    if (this._product.basicLead || this._product.paymentType === 'cpl') {
      return 'Enquire Now'
    }
    if (this._product && this._product.paymentType === 'cpa') {
      return 'Apply Now'
    }
    return 'View Now'
  }
}

export default Decorator
