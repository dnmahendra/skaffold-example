import { string } from 'prop-types'
import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { getVertical } from 'libs/verticals'
import PageContext from 'contexts/page'
import query from './query'

export default class TrendingNews extends Component {
  static contextType = PageContext
  static propTypes = {
    heading: string,
  }
  render () {
    const { heading } = this.props
    const vertical = getVertical(this.context.vertical, 'slug')
    const variables = { vertical, article_type: 'news' }
    return (
      <Query query={query} variables={variables}>
        {({ data: { articles }, error, loading }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error: {error.message}</p>
          return (
            <div>
              <h4>
                {heading}
              </h4>
              {
                articles.map((article) => {
                  return (
                    <div key={article.post_id}>
                      <a href={article.url}>
                        <div>
                          <img src={article.thumbnail_image_url} alt={`${article.title} - article thumbnail`} />
                          <span>{article.article_vertical}</span>
                        </div>
                        <div>
                          <h5>{article.title}</h5>
                          <span>{article.created_at}</span>
                        </div>
                      </a>
                    </div>
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
