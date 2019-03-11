import React, { Component } from 'react'
import { Link } from 'routes'
import styled from 'styled-components'
import Layout from 'components/Layout'

const Container = styled.div`
  .hero {
    width: 100%;
    color: #333;
  }
  .title {
    margin: 0;
    padding-top: 80px;
    line-height: 1.15;
    font-size: 48px;
  }
  .title,
  .description {
    text-align: center;
  }
  .row {
    max-width: 880px;
    margin: 80px auto 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .card {
    padding: 18px 18px 24px;
    width: 220px;
    text-align: left;
    text-decoration: none;
    color: #434343;
    border: 1px solid ${props => props.theme.brandPrimary};
  }
  .card:hover {
    border-color: ${props => props.theme.brandPrimary};
  }
  .card h3 {
    margin: 0;
    color: ${props => props.theme.brandPrimary};
    font-size: 18px;
  }
  .card p {
    margin: 0;
    padding: 12px 0 0;
    font-size: 13px;
    color: #333;
  }
`

export default class Home extends Component {
  render () {
    return (
      <Layout>
        <Container>
          <div className="hero">
            <h1 className="title">Nextjs</h1>
            <p className="description">
              To get started, edit <code>pages/index.js</code> and save to reload.
            </p>
            <div className="row">
              <Link route="/car-loans">
                <a className="card">
                  <h3>Car Loans &rarr;</h3>
                  <p>Learn more about Next on Github and in their examples</p>
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </Layout>
    )
  }
}
