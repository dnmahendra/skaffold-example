import styled from 'styled-components'

export const Th = styled.th`
  align-items: center;
  background-color: ${props => props.theme.colorAlabaster};
  border-right: 1px solid ${props => props.theme.colorAthensGreyLight};
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 12px;
  justify-content: center;
  padding: 10px 8px;
  &:first-child {
    border-left: 1px solid ${props => props.theme.colorAthensGreyLight};
  }
`
export const Title = styled.div`
  text-align: center;
  svg {
    cursor: pointer;
    margin-left: 2px;
    vertical-align: middle;
  }
`
