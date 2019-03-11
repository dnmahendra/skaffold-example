import { oneOfType, string, number } from 'prop-types'
import { Component, Fragment } from 'react'

class TextField extends Component {
  static propTypes = {
    firstLine: oneOfType([ string, number ]),
    subLine: string,
  }
  render () {
    const { firstLine, subLine } = this.props
    const renderFirstline = firstLine ? <p className="first-line">{firstLine}</p> : null
    const renderSubline = subLine ? <p className="first-line">{subLine}</p> : null
    return (
      <Fragment>
        {renderFirstline}
        {renderSubline}
      </Fragment>
    )
  }
}

export default TextField
