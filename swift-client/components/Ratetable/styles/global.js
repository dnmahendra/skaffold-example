
export default `
  > table {
    > thead,
    > tbody {
      .product {
        flex: 3;
      }
    }
    > thead {
      .company {
        .title {
          min-width: 100px;
          @media (max-width: 32em) {
            min-width: auto;
          }
        }
      }
    }
  }

  > table {
    > thead,
    > tbody {
      > tr {
        > th,
        > td {
          &.go-to-site,
          &.details {
            display: flex;
          }
          @media (min-width: 1300px) {
            display: none;
            &:nth-child(-n+8) {
              display: flex;
            }
          }
          @media (min-width: 1199px) {
            display: none;
            &:nth-child(-n+6) {
              display: flex;
            }
          }
          @media (min-width: 1000px) {
            display: none;
            &:nth-child(-n+5) {
              display: flex;
            }
          }
          @media (min-width: 720px) {
            display: none;
            &:nth-child(-n+4) {
              display: flex;
            }
          }
          @media (max-width: 719px) {
            display: none;
            &:nth-child(-n+4) {
              display: flex;
            }
            &.product,
            &.details {
              display: none;
            }
          }
        }
      }
    }
  }
`
