import styled from 'styled-components'
import { darken } from 'polished'

export const Link = styled.a`
  background-color: ${props => props.theme.colorNeonCarrot};
  border-radius: 2px;
  color: ${props => props.theme.white};
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  height: 34px;
  line-height: 1.2;
  padding: 6px 9px;
  text-align: center;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  &:hover {
    background-color: ${props => darken(0.1, props.theme.colorNeonCarrot)};
  }
  &:focus {
    outline: 5px auto -webkit-focus-ring-color;
  }
`
