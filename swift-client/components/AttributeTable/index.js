import { array, object } from 'prop-types'
import { Component } from 'react'
import chunk from 'lodash/chunk'

import Attribute from './attribute'
import { Table, Td } from './styles/table'

class AttributeTable extends Component {
  static propTypes = {
    attributes: array,
    product: object,
  }
  render () {
    const { attributes, product } = this.props
    const chunks = chunk(attributes, 2)
    const renderAttributes = chunks.map((chunk, index) => {
      return (
        <tr key={index}>
          { chunk.map(attribute => <Td key={attribute.key}><Attribute attribute={attribute} product={product} /></Td>) }
        </tr>
      )
    })
    return (
      <Table>
        <tbody>
          {renderAttributes}
        </tbody>
      </Table>
    )
  }
}

export default AttributeTable
