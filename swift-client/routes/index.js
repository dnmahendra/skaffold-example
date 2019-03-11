const routes = require('next-routes')
const _ = require('lodash')

const carLoans = require('./car-loans')

const _routes = routes()

_.concat(carLoans)
  .forEach(({ name, pattern, page }) => _routes.add(name, pattern, page))

module.exports = _routes
