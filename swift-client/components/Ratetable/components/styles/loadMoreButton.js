import styled from 'styled-components'

export const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  cursor: pointer;
  font-weight: 400;
  border-radius: 2px;
  font-family: ${props => props.theme.unicaMed};
  background-color: ${props => props.theme.brandPrimary};
  color: ${props => props.theme.white};
  padding: 10px 18px;
  font-size: 15px;
  line-height: 1.55;
`
