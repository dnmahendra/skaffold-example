import styled from 'styled-components'

export const Wrapper = styled.div`
  text-align: left;
  margin-right: auto;
  a {
    color: ${props => props.theme.black};
  }
`
export const Name = styled.div`
  font-family: ${props => props.theme.unicaBold};
  font-size: 15px;
  margin-bottom: 5px;
`
export const Label = styled.span`
  background: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.supermanRed};
  border-radius: 3px;
  color: ${props => props.theme.supermanRed};
  display: inline-block;
  margin-right: 2px;
  text-transform: captialize;
  padding: 2px 4px;
`
export const Text = styled.div`
  font-size: 12px;
  line-height: 1.1;
`
