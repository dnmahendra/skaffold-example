import { array, object, string } from 'prop-types'
import { Component } from 'react'
import { AlertCircle } from 'react-feather'
import { withRouter } from 'next/router'
import urlParse from 'url-parse'
import qs from 'qs'
import { Router } from 'routes'

import RC from 'components/RC'
import { Wrapper, Filter, SortBy } from './styles'
import { tooltips } from './tooltips'

class ControlBar extends Component {
  static propTypes = {
    attributes: array,
    meta: object,
    vertical: string,
  }
  onChange = (e) => {
    const { router } = this.props
    const url = urlParse(router.asPath, true)
    url.query = Object.assign({}, url.query, { pageSize: e.target.value })
    Router.pushRoute(`${url.pathname}?${qs.stringify(url.query)}`, {}, { shallow: true })
  }
  render () {
    const { attributes, meta, vertical } = this.props

    const from = (meta.page - 1) * meta.pageSize + 1
    const to = meta.page === meta.pageCount ? meta.totalCount : meta.page * meta.pageSize
    return (
      <Wrapper>
        <div className="count">
          Now showing {from} - {to} of {meta.totalCount}
        </div>
        <Filter>
          <SortBy>
            Sort by
            <RC.Tooltip id="rt-sort-by" content={tooltips(vertical)}>
              <AlertCircle size={18} />
            </RC.Tooltip>
          </SortBy>
          <div>
            <select onChange={this.onChange} defaultValue={meta.pageSize}>
              <option value="20">Show 20 </option>
              <option value="50">Show 50 </option>
              <option value="100">Show 100 </option>
            </select>
          </div>
        </Filter>
      </Wrapper>
    )
  }
}

export default withRouter(ControlBar)
