import { css } from 'styled-components'

const base = css`
  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 15px;
  }

  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${props => props.theme.colorAthensGrey};
    box-sizing: border-box;
    color: ${props => props.theme.black};
    font-family: ${props => props.theme.unicaReg};
    font-size: 15px;
    margin: 0;
  }

  a,
  a:hover {
    font-family: ${props => props.theme.unicaMed};
    text-decoration: none;
  }
`

export default base
