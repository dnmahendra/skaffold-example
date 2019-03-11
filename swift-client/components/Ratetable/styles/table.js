import styled from 'styled-components'

import styles from './index'

export const Wrapper = styled.div`
  ${styles.global}
  ${styles.carLoans}
  &.loading {
    opacity: 0.5;
  }
`
export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.colorTuna};
  width: 100%;
`
export const Thead = styled.thead`
  tr:first-child {
    border-top: 1px solid ${props => props.theme.colorAthensGreyLight};
  }
`
export const Tr = styled.tr`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colorAthensGreyLight};
`
