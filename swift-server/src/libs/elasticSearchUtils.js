import client from './elasticSearch'
import _entityTypes from './entityTypes'

export default client
export const entityTypes = _entityTypes

export function getIndexTimestampSuffix () {
  const _date = new Date().toString().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase()
  const randomSuffix = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
  return `${_date}-${randomSuffix}`
}

export function generateIndexName (entityType, indexPrefix = 'blaze') {
  const prefix = process.env.NODE_ENV === 'test' ? 'test-' : ''
  const aliasName = `${prefix}${indexPrefix}-${entityType}`
  const indexName = `${aliasName}-${getIndexTimestampSuffix()}`
  return { aliasName, indexName }
}

export function extractHits (searchResult) {
  return searchResult.hits.hits.map(hit => Object.assign({}, hit._source, { type: hit._type }))
}

export function extractSearchMeta (searchResult, params) {
  const { page, pageSize } = params
  return {
    totalCount: searchResult.hits.total,
    pageCount: Math.ceil(searchResult.hits.total / pageSize),
    page,
    pageSize,
    params,
  }
}
