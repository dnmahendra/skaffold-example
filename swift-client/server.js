require('dotenv').config()

import express from 'express'
import next from 'next'
import routes from './routes'

const PORT = process.env.PORT || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    const app = express()
    app
      .use(handler)
      .listen(PORT, err => {
        if (err) throw err
        console.log(`🚀 Client ready at http://localhost:${PORT}`)
      })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
