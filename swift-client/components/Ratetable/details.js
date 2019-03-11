import { array, object } from 'prop-types'
import { Component } from 'react'
import classnames from 'classnames'

import RC from 'components/RC'
import AttributeTable from 'components/AttributeTable'
import { Wrapper, Box, Toggle, Panel, Title, Arrow } from './styles/details'

class Details extends Component {
  static propTypes = {
    attributes: array,
    product: object,
  }
  state = {
    isOpen: false,
  }
  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }
  render () {
    const { isOpen } = this.state
    const { attributes, product } = this.props
    const renderPanel = isOpen ? (
      <Panel>
        <RC.Card>
          <Title>Details & Fees</Title>
          <AttributeTable product={product} attributes={attributes} />
        </RC.Card>
      </Panel>
    ) : null
    return (
      <Wrapper className="details">
        <Box>
          <Toggle className={classnames({ opened: isOpen })} onClick={this.toggle}>
            <Arrow size={18} />{isOpen ? 'Less' : 'More'} details
          </Toggle>
        </Box>
        {renderPanel}
      </Wrapper>
    )
  }
}

export default Details
