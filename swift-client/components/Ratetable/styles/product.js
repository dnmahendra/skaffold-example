import styled from 'styled-components'

export const Tr = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colorAthensGreyLight};
  border-left: 1px solid ${props => props.theme.colorAthensGreyLight};
  border-right: 1px solid ${props => props.theme.colorAthensGreyLight};
  display: flex;
  flex-wrap: wrap;
`
export const Td = styled.td`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 10px 8px;
  text-align: center;
  vertical-align: middle;
  position: relative;
  &.sorted {
    background-color: ${props => props.theme.colorAlabaster};
  }
`
