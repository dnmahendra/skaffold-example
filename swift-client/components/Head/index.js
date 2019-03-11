import { Component } from 'react'
import Head from 'next/head'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import PageContext from 'contexts/page'

class RcHead extends Component {
  static contextType = PageContext
  render () {
    if (isEmpty(this.context)) return null
    const page = this.context
    return (
      <Head>
        <title>{page.title || 'RateCity'}</title>
        <meta name="description" content={page.description} />
        <meta property="og:title" content={get(page, 'og.title')} />
        <meta property="og:description" content={get(page, 'og.description')} />
        <meta property="og:type" content={get(page, 'og.type')} />
        <meta property="og:url" content={page.canonical} />
        <meta property="og:site_name" content={get(page, 'og.siteName')} />
        <meta property="og:image" content={get(page, 'og.image')} />
        <meta property="fb:admins" content={get(page, 'og.id')} />
        <meta property="fb:pages" content={get(page, 'og.id')} />
        <link rel="stylesheet" href="//fast.fonts.net/cssapi/8ebe4256-062e-4fda-ad32-f37d953bc76c.css" />
      </Head>
    )
  }
}

export default RcHead
