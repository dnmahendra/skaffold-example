import { array, object } from 'prop-types'
import { Component, Fragment } from 'react'
import { Query } from 'react-apollo'

import { getVertical } from 'libs/verticals'
import PageContext from 'contexts/page'
import RatetableContext from 'contexts/ratetable'
import Table from './table'
import queries from './queries'
import { extract } from './utils'
import { LoadMoreButton } from './components/styles/loadMoreButton'

class Ratetable extends Component {
  static contextType = PageContext
  static propTypes = {
    attributes: array,
    variables: object,
  }
  render () {
    const { attributes, variables } = this.props
    const vertical = getVertical(this.context.vertical)
    const query = queries[vertical.slug]
    if (!query) return null
    return (
      <RatetableContext.Provider value={variables}>
        <Query query={query} variables={variables}>
          {({ data, error, loading, fetchMore }) => {
            if (error) return null
            const { products, meta, hasMore } = extract(data, vertical.slug)
            return (
              <Fragment>
                <Table
                  attributes={attributes}
                  loading={loading}
                  meta={meta}
                  products={products}
                />
                {hasMore && (
                <LoadMoreButton
                  onClick={() => {
                    fetchMore({
                      variables: {
                        page: meta.page + 1,
                      },
                      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                        if (!fetchMoreResult) return prev
                        return {
                          ...fetchMoreResult,
                          carLoans: {
                            ...fetchMoreResult.carLoans,
                            carLoans: [
                              ...prev.carLoans.list,
                              ...fetchMoreResult.carLoans.list,
                            ],
                          },
                        }
                      },
                    })
                  }}
                >
                  Load More...
                </LoadMoreButton>
                )}
              </Fragment>
            )
          }}
        </Query>
      </RatetableContext.Provider>
    )
  }
}

export default Ratetable
