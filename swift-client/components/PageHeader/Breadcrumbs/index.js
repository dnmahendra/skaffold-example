import { array } from 'prop-types'
import { Component } from 'react'

import { Ol, Li } from './styles'

class Breadcrumbs extends Component {
  static propTypes = {
    breadcrumbs: array,
  }
  render () {
    const { breadcrumbs } = this.props
    const renderBreadcrumbs = breadcrumbs.map(({ name, href }, i) => {
      if (href) {
        return (
          <Li key={i} property="itemListElement" typeof="ListItem">
            <a property="item" typeof="WebPage" href={href}>
              <span property="name">{name}</span>
            </a>
            <meta property="position" content={i + 1} />
          </Li>
        )
      }
      return (
        <Li key={i} className="active">
          <span>{name}</span>
        </Li>
      )
    })
    return (
      <Ol vocab="http://schema.org/" typeof="BreadcrumbList">
        {renderBreadcrumbs}
      </Ol>
    )
  }
}

export default Breadcrumbs
