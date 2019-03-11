import { object } from 'prop-types'
import { Component } from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Check } from 'react-feather'

import RC from 'components/RC'
import ApplyButton from 'components/ApplyButton'
import { Wrapper, Box, Logo, Title, Description, Pro, Attribute, Disclaimer } from './styles'

class Banner extends Component {
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    const discliamer = `RateCity may receive remuneration for clicks on these links and/or as a consequence of a consumer acquiring a credit product after following these links.`
    const [ first, second ] = product.featuredAttributes()
    return (
      <Wrapper className="featured-product banner">
        <RC.Card>
          <Row>
            <Col className="column" xs={6} md={2}>
              <Box className="box">
                <Logo src={product.company.logo} alt={product.company.name} />
              </Box>
            </Col>
            <Col className="column" xs={6} md={2}>
              <Box className="box" direction="column" align="flex-start">
                <Title>{product.title}</Title>
                <Description>{product.description}</Description>
              </Box>
            </Col>
            <Col className="column" xs={6} md={2}>
              <Box className="box" direction="column">
                <Attribute.Title>{first.title}</Attribute.Title>
                <Attribute.Value>{first.value}</Attribute.Value>
              </Box>
            </Col>
            <Col className="column" xs={6} md={2}>
              <Box className="box" direction="column">
                <Attribute.Title>{second.title}</Attribute.Title>
                <Attribute.Value>{second.value}</Attribute.Value>
              </Box>
            </Col>
            <Col className="column" xs={12} md={2}>
              <Box className="box" wrap="wrap" justify="flex-start">
                {product.pros.slice(0, 2).map((pro, index) => <Pro key={index}><Check size={18} />{pro}</Pro>)}
              </Box>
            </Col>
            <Col className="column" xs={12} md={2}>
              <Box className="box">
                <ApplyButton product={product} placement="featured-product-banner" position={0} />
              </Box>
            </Col>
          </Row>
        </RC.Card>
        <Disclaimer>
          <RC.Tooltip id="featured-product-banner-discliamer" content={discliamer}>
            Promoted
          </RC.Tooltip>
          <ApplyButton product={product} placement="featured-product-banner" position={1}>
            {product.company.acl ? `ACL:${product.company.acl} ` : ''}{product.company.name} terms and conditions
          </ApplyButton>
        </Disclaimer>
      </Wrapper>
    )
  }
}

export default Banner
