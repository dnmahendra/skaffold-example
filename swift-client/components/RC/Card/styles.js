import styled from 'styled-components'

export const Wrapper = styled.div`
  background: ${props => props.theme.white};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colorAthensGreyLight};
  box-shadow: 0 3px 6px rgba(40, 63, 69, 0.06);
  color: ${props => props.theme.colorLogCabin};
  padding: 10px;
`
