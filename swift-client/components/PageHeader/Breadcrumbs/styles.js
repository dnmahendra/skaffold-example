import styled from 'styled-components'

export const Ol = styled.ol`
  font-size: 12px;
  padding: 0;
  margin-bottom: 10px;
`

export const Li = styled.li`
  display: inline-block;
  & + li:before {
    content: "|";
    color: ${props => props.theme.colorNobel};
    padding: 0 8px;
  }
  &.active {
    color: ${props => props.theme.white};
  }
  a {
    color: ${props => props.theme.colorNobel};
  }
`
