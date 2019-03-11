import React, { Component } from 'react'
import { Link } from 'routes'

import Layout from 'components/Layout'

class Companies extends Component {
  render () {
    return (
      <Layout className="car-loans-companies">
        <div className="container">
          <h1 className="title">Companies</h1>
          <div>
            <Link route="/car-loans">
              <a>Car loan landing page</a>
            </Link>
          </div>
          <div>
            <Link route="/car-loans/news/next-car-loan-may-hybrid">
              <a>Your next car loan may be for a hybrid</a>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Companies
