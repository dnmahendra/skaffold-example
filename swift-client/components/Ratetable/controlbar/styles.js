import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid ${props => props.theme.colorAthensGreyLight};
  border-bottom: none;
`

export const Filter = styled.div`
  display: flex;
`

export const SortBy = styled.div`
  svg {
    margin-left: 5px;
    vertical-align: middle;
  }
`
