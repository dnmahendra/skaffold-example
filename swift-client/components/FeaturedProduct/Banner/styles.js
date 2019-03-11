import styled from 'styled-components'

import { media } from 'styles/mediaQuery'

export const Wrapper = styled.div`
  .rc-card {
    padding: 20px;
    ${media.tablet`padding: 15px;`}
  }
  .column:last-child {
    .box {
      border-right: none;
    }
  }
`

export const Box = styled.div`
  align-items: ${props => props.align || 'center'};
  border-right: 1px solid ${props => props.theme.colorAthensGreyLight};
  display: flex;
  flex-direction: ${props => props.direction};
  flex-wrap: ${props => props.wrap};
  height: 100%;
  justify-content: ${props => props.justify || 'center'};
  ${media.tablet`
    border-right: none;
    margin-bottom: 10px;
  `}
`

export const Logo = styled.img`
  max-width: 100px;
`

export const Title = styled.h5`
  font-family: ${props => props.theme.unicaBold};
  margin-bottom: 5px;
`

export const Description = styled.p`
  line-height: 1.2;
`

export const Attribute = {
  Title: styled.div`
  `,
  Value: styled.div`
    font-family: ${props => props.theme.unicaBold};
    font-size: 28px;
  `,
}

export const Pro = styled.span`
  display: flex;
  font-size: 12px;
  line-height: 1.2;
  svg {
    margin-right: 5px;
    color: ${props => props.theme.brandGreen};
  }
`

export const Disclaimer = styled.div`
  align-items: center;
  color: ${props => props.theme.colorTuna};
  display: flex;
  font-size: 12px;
  justify-content: flex-end;
  padding: 5px;
  ${media.tablet`
    align-items: flex-end;
    flex-direction: column;
  `}
  .handler {
    margin-right: 10px;
    ${media.tablet`
      margin-right: 0;
    `}
  }
  .go-to-site {
    background: transparent;
    color: ${props => props.theme.colorTuna};
    font-family: ${props => props.theme.unicaReg};
    font-size: 12px;
    height: auto;
    padding: 0;
    text-decoration: underline;
  }
`
