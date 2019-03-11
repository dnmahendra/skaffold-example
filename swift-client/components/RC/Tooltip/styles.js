import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

export const Wrapper = styled(ReactTooltip)`
  border: 1px solid ${props => props.theme.colorAthensGreyLight};
  border-top: 5px solid ${props => props.theme.colorLynch};
  color: ${props => props.theme.colorLogCabin};
  font-size: 12px;
  font-weight: 400;
  max-width: 200px;
  padding: 8px;
  text-align: left;
  &:after {
    border-bottom-color: ${props => props.theme.colorLynch} !important;
    top: -11px !important;
  }
  .content {
    display: inline !important;
  }
`
