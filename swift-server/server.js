require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import CarLoanSearch from 'search/clients/CarLoanSearch'

import createServer from './createServer'

const PORT = 80

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const server = createServer()

server.applyMiddleware({
  app,
  path: '/',
})

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`)
})
