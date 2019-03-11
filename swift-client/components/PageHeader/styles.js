import styled from 'styled-components'
import { media } from 'styles/mediaQuery'

export const Wrapper = styled.div`
  min-height: 350px;
  margin: 0 auto;
  padding: 20px 0;
  background-repeat: no-repeat;
  background-size: auto;
  background-position: 50%;
  &.car-loans {
    background-color: ${props => props.theme.carLoansBanner};
  }
  ${media.phone`
    min-height: 200px;
  `}
`

export const Heading = styled.h1`
  color: ${props => props.theme.white};
  margin-bottom: 15px;
  padding-top: 40px;
  ${media.phone`
    padding-top: 10px;
  `}
`

export const Tagline = styled.h5`
  color: ${props => props.theme.white};
`
