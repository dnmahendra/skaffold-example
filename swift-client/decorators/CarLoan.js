import get from 'lodash/get'
import numeral from 'numeral'

import Decorator from './Base'

class CarLoanDecorator extends Decorator {
  featuredAttributes () {
    return [{
      title: 'Advertised Rate',
      value: this.advertisedRate(),
    }, {
      title: 'Comparision Rate*',
      value: this.comparisonRate(),
    }]
  }

  loanTerm (params) {
    return get(params, 'loanTerm', 5)
  }

  borrowAmount (params) {
    return get(params, 'borrowAmount', 30000)
  }

  minRate () {
    return this._product.variation.minRate
  }

  maxRate () {
    return this._product.variation.maxRate
  }

  advertisedRate () {
    return `${this.minRate().toFixed(2)}%`
  }

  comparisonRate () {
    const { comparisonRate } = this._product.variation
    return `${comparisonRate.toFixed(2)}%${this._product.comparisonRateDisclaimer ? '*' : ''}`
  }

  headLine () {
    const { headlineRate, minRate, maxRate } = this._product.variation
    const headLine = headlineRate ? 'Headline rate' : ''
    const from = minRate < maxRate ? 'From' : ''
    return headLine ? `${headLine} ${from}` : from
  }

  productName () {
    const { name } = this._product.variation
    return `${this._product.name}${name ? ` - ${name}` : ''}`
  }

  upfrontFees () {
    const { applicationFeesDollar, applicationFeesPercent } = this._product.variation
    if (applicationFeesDollar) {
      return `$${applicationFeesDollar}`
    }
    if (applicationFeesPercent) {
      return `${applicationFeesPercent}%`
    }
    if (this._product.applicationFeesDollar) {
      return `$${this._product.applicationFeesDollar}`
    }
    if (this._product.applicationFeesPercent) {
      return `${this._product.applicationFeesPercent}%`
    }
    return '$0'
  }

  upfrontFeesText () {
    const { applicationFeesPercent } = this._product.variation
    if (this._product.applicationFeesPercent || applicationFeesPercent) {
      return 'of loan amount'
    }
  }

  loanAmount () {
    const { minLoanAmount, maxLoanAmount } = this._product.variation
    const min = numeral(minLoanAmount).format('$0.[0]a')
    const max = numeral(maxLoanAmount).format('$0.[0]a')
    if (!max || max === '$100m') {
      return `From ${min}`
    }
    if (!min) {
      return `Up to ${max}`
    }
    return `${min} to ${max}`
  }

  borrowingRange () {
    const { minLoanAmount, maxLoanAmount } = this._product.variation
    const min = numeral(minLoanAmount).format('$0.[0]a')
    const max = numeral(maxLoanAmount).format('$0.[0]a')
    return `${min} - ${max}`
  }
}

export default CarLoanDecorator
