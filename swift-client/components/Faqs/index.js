import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'

import { getVertical } from 'libs/verticals'
import PageContext from 'contexts/page'
import query from './query'

export default class Faqs extends Component {
  static contextType = PageContext
  render () {
    const vertical = getVertical(this.context.vertical, 'slug')
    return (
      <Query query={query} variables={{ vertical }}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error: {error.message}</p>
          const { faqs } = data
          return (
            <div>
              {
                faqs.map((faq, index) => {
                  return (
                    <Fragment key={index}>
                      <h2>
                        <a href={faq.url}>{faq.title}</a>
                      </h2>
                      <p>{faq.body}</p>
                    </Fragment>
                  )
                })
              }
            </div>
          )
        }}
      </Query>
    )
  }
}
