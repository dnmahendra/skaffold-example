import { string } from 'prop-types'
import { Component } from 'react'
import { Query } from 'react-apollo'
import { withRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import urlParse from 'url-parse'

import { theme, GlobalStyles } from 'styles/globalStyles'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Head from 'components/Head'
import PageContext from 'contexts/page'
import query from './query'

class Layout extends Component {
  static propTypes = {
    className: string,
  }
  static defaultProps = {
    className: '',
  }
  render () {
    const { className, children, router } = this.props
    const url = urlParse(router.asPath, true)
    return (
      <Query query={query} variables={{ url: url.pathname }}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error: {error.message}</p>
          const { page } = data
          return (
            <PageContext.Provider value={page}>
              <ThemeProvider theme={theme}>
                <div className={className}>
                  <Head />
                  <Header />
                  <GlobalStyles />
                  <main>
                    {children}
                  </main>
                  <Footer />
                </div>
              </ThemeProvider>
            </PageContext.Provider>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(Layout)
