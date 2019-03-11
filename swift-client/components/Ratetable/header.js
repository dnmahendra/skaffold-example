import { object } from 'prop-types'
import { Component } from 'react'
import { AlertCircle } from 'react-feather'

import RC from 'components/RC'
import { Th, Title } from './styles/header'

class Header extends Component {
  static propTypes = {
    attribute: object,
  }
  render () {
    const { attribute } = this.props
    const { key, title, tooltip } = attribute
    const renderTooltip = tooltip ? (
      <RC.Tooltip id={key} content={tooltip}>
        <AlertCircle size={12} />
      </RC.Tooltip>
    ) : null
    return (
      <Th className={key}>
        <Title className="title">
          {title}
          {renderTooltip}
        </Title>
      </Th>
    )
  }
}

export default Header
