import styled from 'styled-components'
import { ChevronUp } from 'react-feather'

export const Wrapper = styled.td`
  align-items: stretch;
  background-color: ${props => props.theme.colorSelago};
  border-top: 1px solid ${props => props.theme.colorAthensGreyLight};
  flex-basis: 100%;
  flex-direction: column;
  padding: 0;
`
export const Box = styled.div`
  display: flex;
  justify-content: center;
`
export const Toggle = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colorAlabaster};
  border: 1px solid ${props => props.theme.colorAthensGreyLight};
  border-top: none;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  margin-bottom: 10px;
  padding: 5px 10px;
`
export const Panel = styled.div`
  padding: 0 20px 20px;
  > .rc-card {
    padding: 20px 30px;
  }
`
export const Title = styled.div`
  border-bottom: 1px solid ${props => props.theme.colorAthensGreyLight};
  font-size: 18px;
  margin-bottom: 30px;
  padding-bottom: 15px;
  text-align: left;
`
export const Arrow = styled(ChevronUp)`
  margin-right: 5px;
  vertical-align: bottom;
  transition: transform 0.35s ease-in-out;
  ${Toggle}.opened & {
    transform: rotateX(180deg);
  }
`
