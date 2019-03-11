import styled from 'styled-components'

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  background-color: $white;
  color: ${props => props.theme.colorTuna};
  width: 100%;
`

export const Td = styled.td`
  border-bottom: 1px solid ${props => props.theme.colorAthensGreyLight};
  &:first-child {
    padding-right: 10px;
  }
  &:last-child {
    padding-left: 10px;
  }
  &:only-child {
    padding: 0 10px 0 0;
  }
`
