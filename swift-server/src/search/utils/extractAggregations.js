import pick from 'lodash/pick'

export default function extractAggregations (aggs) {
  return pick(aggs, ['buckets', 'count', 'min', 'max'])
}
