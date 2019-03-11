import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`

export const Title = styled.div`
  align-items: center;
  display: flex;
`

export const Value = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .minus
  .check {
    width: 18px;
    height: 18px;
  }
  .check {
    stroke: ${props => props.theme.brandGreen};
  }
  .minus {
    stroke: ${props => props.theme.colorLogCabin};
  }
`
