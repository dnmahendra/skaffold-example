import styled from 'styled-components'

import { media } from 'styles/mediaQuery'

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colorSelago};
  padding-bottom: 40px;
  padding-top: 40px;
  ${media.phone`
    padding-bottom: 20px;
    padding-top: 20px;
  `}
  &:empty {
    display: none;
  }
  &.rc-greyed {
    background-color: ${props => props.theme.colorAlabaster};
  }
  &.no-padding {
    padding: 0;
    ${media.phone`
      padding: 0;
    `}
  }
`
