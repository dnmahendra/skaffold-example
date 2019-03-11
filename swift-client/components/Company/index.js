import { string, bool } from 'prop-types'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'routes'

import { getVertical } from 'libs/verticals'
import PageContext from 'contexts/page'
import styled from 'styled-components'
import query from './query'

const Container = styled.div`
  margin: 10px auto;

  a {
    color: ${props => props.theme.colorLynch};
  }

  h4 {
    font-size: 26px;
    text-align: center;
    margin: 10px auto;
  }
  h5 {
    text-align: center;
    color: gray;
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: normal;
  }
  .company-list {
    display: flex;
    flex-wrap: wrap;

    .company-wrapper {
      padding: 30px;
      border: 1px solid ${props => props.theme.colorAthensGreyLight};
      width: 160px;
      height: 95px;

      .company {
        width: 115px;
        filter: grayscale(100%);

        &:hover {
          filter: none;
        }
      }
    }
  }
`

export default class Company extends Component {
  static contextType = PageContext
  static propTypes = {
    heading: string,
    subheading: string,
    viewAllLink: string,
  }
  render () {
    const { heading, subheading, viewAllLink } = this.props
    const vertical = getVertical(this.context.vertical, 'slug')
    const variables = { vertical }
    return (
      <Query query={query} variables={variables}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error: {error.message}</p>
          const { companies } = data
          const renderViewAllLink = viewAllLink ? <Link route={viewAllLink}><a>View All > </a></Link> : null
          return (
            <Container>
              <div>
                <h4>
                  {heading}
                </h4>
                <h5>
                  {subheading} {renderViewAllLink}
                </h5>
                <div className="company-list">
                  {
                    companies.data.map((compnay, index) => {
                      return (
                        <div className="company-wrapper" key={index}>
                          <a key={index} href={compnay.url}>
                            <div>
                              <img className="company" src={compnay.logo} alt={`${compnay.displayName} - compan thumbnail`} />
                            </div>
                          </a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Container>
          )
        }}
      </Query>
    )
  }
}
