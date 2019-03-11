import { number, string, object } from 'prop-types'
import { Component } from 'react'
import urlParse from 'url-parse'

import { Link } from './styles'

class ApplyButton extends Component {
  static propTypes = {
    product: object,
    position: number,
    placement: string,
  }
  state = {
    submitting: false,
  }
  onClick = async (event) => {
    const { submitting } = this.state
    if (submitting) {
      event.preventDefault()
      return
    }
    this.setState({ submitting: true })
    // TODO tracking
    this.setState({ submitting: false })
  }
  render () {
    const { product, position, placement, children } = this.props
    const url = urlParse(product.applyUrl, true)
    // url.query.rf = document.referrer
    // url.query.dvc_id = tracking.getDeviceId()
    // url.query.ab_tst_bckt = tracking.trackingState.page.abTestBucket
    // url.query.impressionId = impressionId
    if (product.overallRating) {
      url.query.overallRating = product.overallRating
    }
    if (product.costRating) {
      url.query.costRating = product.costRating
    }
    if (product.flexibilityRating) {
      url.query.flexibilityRating = product.flexibilityRating
    }
    if (product.flexibilityRawScore) {
      url.query.flexibilityScore = product.flexibilityRawScore
    }
    if (product.averageMonthlyCost) {
      url.query.averageMonthlyCost = product.averageMonthlyCost
    }
    if (product.featured) {
      url.query.featured = product.featured
    }
    if (product.basicLead) {
      url.query.basicLead = product.basicLead
    }
    if (product.paymentType) {
      url.query.paymentType = product.paymentType
    }
    // url.query.page_type = ''
    url.query.hasOfferId = product.hasOfferId ? product.hasOfferId : 0
    url.query.position = position
    url.query.placement = placement
    url.set('protocol', '')

    return (
      <Link className="go-to-site" href={url.href} onClick={this.onClick}>
        {children || product.applyButtonText}
      </Link>
    )
  }
}

export default ApplyButton
