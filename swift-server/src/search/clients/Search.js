import { concat } from 'lodash'

export default class Search {
  constructor () {
    this.filters = []
    this.nestedFilters = []
    this.functionList = []
    this.aggFilters = []
    this.aggNestedFilters = []
    this.sorts = []
    this.nestedSortFilter = []
  }

  termFilter (param, filter, value, isAgg, fieldName) {
    if (this.params[param]) {
      this.termFilterStaticParam(filter, value, isAgg, fieldName)
    }
  }

  termFilterFalsy (param, filter, value, isAgg, fieldName) {
    if (typeof this.params[param] !== 'undefined') {
      this.termFilterStaticParam(filter, value, isAgg, fieldName)
    }
  }

  nestedTermFilterStaticParam (param, path, filter, value) {
    this.filters.push({
      nested: {
        path: path,
        filter: {
          term: {
            [`${path}.${filter}`]: value,
          },
        },
      },
    })
  }

  nestedTermFilter (param, path, filter, value) {
    if (this.params[param]) {
      this.nestedTermFilterStaticParam(param, path, filter, value)
    }
  }

  nestedTermsFilterStaticParam (param, path, filter, value) {
    this.filters.push({
      nested: {
        path: path,
        filter: {
          terms: {
            [`${path}.${filter}`]: value,
          },
        },
      },
    })
  }

  nestedTermsFilter (param, path, filter, value) {
    if (this.params[param]) {
      this.nestedTermFilterStaticParam(param, path, filter, value)
    }
  }

  nestedTermFilterFalsy (param, path, filter, value) {
    if (typeof this.params[param] !== 'undefined') {
      this.nestedTermFilterStaticParam(param, path, filter, value)
    }
  }

  termFilterStaticParam (filter, value, isAgg, fieldName) {
    if (isAgg) {
      if (fieldName !== filter) {
        this.aggFilters.push(
          {
            term: {
              [filter]: value,
            },
          }
        )
      }
    } else {
      this.filters.push(
        {
          term: {
            [filter]: value,
          },
        }
      )
    }
  }

  matchFilter (param, filter, value, isAgg, fieldName) {
    if (this.params[param]) {
      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push(
            {
              match: {
                [filter]: value,
              },
            }
          )
        }
      } else {
        this.filters.push(
          {
            match: {
              [filter]: value,
            },
          }
        )
      }
    }
  }

  matchFilterStaticParam (filter, value, isAgg, fieldName) {
    if (isAgg) {
      if (fieldName !== filter) {
        this.aggFilters.push(
          {
            match: {
              [filter]: value,
            },
          }
        )
      }
    } else {
      this.filters.push(
        {
          match: {
            [filter]: value,
          },
        }
      )
    }
  }

  termsFilter (param, filter, value, isAgg, fieldName) {
    if (this.params[param]) {
      this.termsFilterStaticParams(filter, value, isAgg, fieldName)
    }
  }

  termsFilterStaticParams (filter, value, isAgg, fieldName) {
    if (isAgg) {
      if (fieldName !== filter) {
        this.aggFilters.push(
          {
            terms: {
              [filter]: value,
            },
          }
        )
      }
    } else {
      this.filters.push(
        {
          terms: {
            [filter]: value,
          },
        }
      )
    }
  }

  notFilter (param, filter, value, isAgg, fieldName) {
    if (this.params[param]) {
      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push(
            {
              not: {
                terms: {
                  [filter]: value,
                },
              },
            }
          )
        }
      } else {
        this.filters.push(
          {
            not: {
              terms: {
                [filter]: value,
              },
            },
          }
        )
      }
    }
  }

  orFilter (param, filter, isAgg, fieldName) {
    if (this.params[param]) {
      let orCondition = concat([], this.params[filter]).map((value) => ({
        term: {[filter]: unescape(value)},
      }))

      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push({
            or: orCondition,
          })
        }
      } else {
        this.filters.push({
          or: orCondition,
        })
      }
    }
  }

  existsFilter (param, filter) {
    if (this.params[param]) {
      this.filters.push({
        exists: {
          field: filter,
        },
      })
    }
  }

  missingFilter (param, filter) {
    if (this.params[param]) {
      this.filters.push({
        missing: {
          field: [filter],
        },
      })
    }
  }

  nestedExistsFilter (param, path, filter) {
    if (this.params[param]) {
      this.filters.push({
        nested: {
          path: `${path}.${filter}`,
          query: {
            bool: {
              must: [
                {
                  exists: {
                    field: `${path}.${filter}`,
                  },
                },
              ],
            },
          },
        },
      })
    }
  }

  rangeFilter (param, minField, maxField, isAgg, fieldName) {
    if (!isNaN(this.params[param])) {
      if (isAgg) {
        if (fieldName !== maxField) {
          this.aggFilters.push({
            range: {
              [minField]: {
                lte: this.params[maxField],
              },
            },
          })

          this.aggFilters.push({
            range: {
              [maxField]: {
                gte: this.params[maxField],
              },
            },
          })
        }
      } else {
        this.filters.push({
          range: {
            [minField]: {
              lte: this.params[maxField],
            },
          },
        })

        this.filters.push({
          range: {
            [maxField]: {
              gte: this.params[maxField],
            },
          },
        })
      }
    }
  }

  rangeFilterLT (param, filter, value, isAgg, fieldName) {
    if (this.params[param]) {
      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push({
            range: {
              [filter]: {
                lt: value,
              },
            },
          })
        }
      } else {
        this.filters.push({
          range: {
            [filter]: {
              lt: value,
            },
          },
        })
      }
    }
  }

  rangeFilterLTE (param, filter, value, isAgg, fieldName) {
    if (!isNaN(this.params[param])) {
      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push({
            range: {
              [filter]: {
                lte: value,
              },
            },
          })
        }
      } else {
        this.filters.push({
          range: {
            [filter]: {
              lte: value,
            },
          },
        })
      }
    }
  }

  rangeFilterGT (param, filter, value, isAgg, fieldName) {
    if (this.params[param]) {
      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push({
            range: {
              [filter]: {
                gt: value,
              },
            },
          })
        }
      } else {
        this.filters.push({
          range: {
            [filter]: {
              gt: value,
            },
          },
        })
      }
    }
  }

  rangeFilterGTE (param, filter, value, isAgg, fieldName) {
    if (!isNaN(this.params[param])) {
      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push({
            range: {
              [filter]: {
                gte: value,
              },
            },
          })
        }
      } else {
        this.filters.push({
          range: {
            [filter]: {
              gte: value,
            },
          },
        })
      }
    }
  }

  rangeFilterGTEOrMissing (param, filter, value, isAgg, fieldName) {
    if (!isNaN(this.params[param])) {
      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push({
            or: [
              {
                range: {
                  [filter]: {
                    gte: value,
                  },
                },
              },
              {
                missing: {field: [filter]},
              },
            ],
          })
        }
      } else {
        this.filters.push({
          or: [
            {
              range: {
                [filter]: {
                  gte: value,
                },
              },
            },
            {
              missing: {field: [filter]},
            },
          ],
        })
      }
    }
  }

  postCodesFilter (param, filter, value, isAgg, fieldName) {
    if (this.params[param]) {
      if (!Array.isArray(this.params[filter])) {
        this.params[filter] = [this.params[filter]]
      }
      let searchTerms = []

      this.params[filter].forEach((code) => {
        let c = code.split('')
        for (let i = c.length - 1; i >= 0; i--) {
          c[i] = '#'
          searchTerms.push(c.join(''))
        }
      })

      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push({
            terms: {
              [filter]: [
                ...this.params[filter],
                ...searchTerms,
              ],
            },
          })
        }
      } else {
        this.filters.push({
          terms: {
            [filter]: [
              ...this.params[filter],
              ...searchTerms,
            ],
          },
        })
      }
    }
  }

  companyFilter (param, filter, isAgg, fieldName) {
    if (this.params[param] && this.params[param].length) {
      let companyCondition = concat([], this.params[param]).map((company) => ({
        term: {[filter]: company},
      }))

      if (isAgg) {
        if (fieldName !== filter) {
          this.aggFilters.push({
            or: companyCondition,
          })
        }
      } else {
        this.filters.push({
          or: companyCondition,
        })
      }
    }
  }

  nestedCompanyFilter (param, filter, isAgg, fieldName) {
    if (this.params[param]) {
      if (isAgg) {
        if (fieldName !== param) {
          let companyCondition = this.params[param].map((company) => ({
            nested: {
              path: 'company',
              filter: {
                term: {[filter]: company},
              },
            },
          }))

          this.aggFilters.push({
            or: companyCondition,
          })
        }
      }
      this.filters.push({
        nested: {
          path: 'company',
          filter: {
            term: {[filter]: this.params[param]},
          },
        },
      })
    }
  }

  queryStringFilter (value, lookUpFields) {
    if (this.params.query_string) {
      this.filters.push({
        query: {
          multi_match: {
            query: value,
            type: 'phrase_prefix',
            fields: lookUpFields,
          },
        },
      })
    }
  }

  nestedRangeFilters (param, path, minField, maxField, value, isAgg, fieldName) {
    if (!isNaN(this.params[param])) {
      const minPath = `${path}.${minField}`
      const maxPath = `${path}.${maxField}`
      if (isAgg) {
        if (fieldName !== maxField) {
          this.aggNestedFilters.push(
            {
              'range': {
                [minPath]: {
                  lte: value,
                },
              },
            }
          )
          this.aggNestedFilters.push(
            {
              'range': {
                [maxPath]: {
                  gte: value,
                },
              },
            }
          )
        }
      } else {
        this.nestedFilters.push(
          {
            'range': {
              [minPath]: {
                lte: value,
              },
            },
          }
        )
        this.nestedFilters.push(
          {
            'range': {
              [maxPath]: {
                gte: value,
              },
            },
          }
        )
      }
    }
  }

  nestedRangeFiltersLTE (param, path, field, value, isAgg, fieldName) {
    if (this.params[param]) {
      const nestedPath = `${path}.${field}`
      if (isAgg) {
        if (fieldName !== field) {
          this.aggNestedFilters.push(
            {
              'range': {
                [nestedPath]: {
                  lte: value,
                },
              },
            }
          )
        }
      } else {
        this.nestedFilters.push(
          {
            'range': {
              [nestedPath]: {
                lte: value,
              },
            },
          }
        )
      }
    }
  }

  nestedRangeFiltersGTEStaticParams (param, path, field, value, isAgg, fieldName) {
    const nestedPath = `${path}.${field}`
    if (isAgg) {
      if (fieldName !== field) {
        this.aggNestedFilters.push(
          {
            'range': {
              [nestedPath]: {
                gte: value,
              },
            },
          }
        )
      }
    } else {
      this.nestedFilters.push(
        {
          'range': {
            [nestedPath]: {
              gte: value,
            },
          },
        }
      )
    }
  }

  nestedRangeFiltersGTE (param, path, field, value, isAgg, fieldName) {
    if (this.params[param]) {
      this.nestedRangeFiltersGTEStaticParams(param, path, field, value, isAgg, fieldName)
    }
  }

  nestedRangeFiltersGTEFalsy (param, path, field, value, isAgg, fieldName) {
    if (typeof this.params[param] !== 'undefined') {
      this.nestedRangeFiltersGTEStaticParams(param, path, field, value, isAgg, fieldName)
    }
  }

  nestedRangeFiltersGT (param, path, field, value, isAgg, fieldName) {
    if (this.params[param]) {
      const nestedPath = `${path}.${field}`
      if (isAgg) {
        if (fieldName !== field) {
          this.aggNestedFilters.push(
            {
              'range': {
                [nestedPath]: {
                  gt: value,
                },
              },
            }
          )
        }
      } else {
        this.nestedFilters.push(
          {
            'range': {
              [nestedPath]: {
                gt: value,
              },
            },
          }
        )
      }
    }
  }

  dateFilterGT (param, filter, value, fieldName) {
    if (this.params[param]) {
      this.filters.push({
        bool: {
          must: {
            range: {
              [filter]: {
                gt: value,
              },
            },
          },
        },
      })
    }
  }

  addFieldValueFactorBoost (param, field) {
    if (this.params[param]) {
      this.functionList.push({
        filter: {
          exists: {
            field: field,
          },
        },
        field_value_factor: {
          field: field,
        },
      })
    }
  }

  addWeightBoost (filter, value, weight) {
    if (value !== null && typeof value !== 'undefined') {
      const term = Array.isArray(value) ? 'terms' : 'term'
      this.functionList.push(
        {
          filter: {
            [term]: {
              [filter]: value,
            },
          },
          weight,
        }
      )
    }
  }

  addWeightBoostRange (maxField, minField, weight) {
    this.functionList.push(
      {
        filter: {
          range: {
            [minField]: {
              lte: this.params[maxField],
            },
          },
        },
        weight: weight,
      },
      {
        filter: {
          range: {
            [minField]: {
              gte: this.params[maxField],
            },
          },
        },
        weight: weight,
      },
    )
  }

  addWeightBoostRangeGTE (field, value, weight) {
    this.functionList.push(
      {
        filter: {
          range: {
            [field]: {
              gte: value,
            },
          },
        },
        weight: weight,
      }
    )
  }

  addWeightBoostRangeLTE (field, value, weight) {
    this.functionList.push(
      {
        filter: {
          range: {
            [field]: {
              lte: value,
            },
          },
        },
        weight,
      }
    )
  }

  addWeightBoostExists (field, weight) {
    this.functionList.push(
      {
        filter: {
          exists: {
            field,
          },
        },
        weight,
      }
    )
  }

  addNestedWeightRangeFilters (param, path, field, deviation, isAgg, weight) {
    if (this.params[param]) {
      const nestedPath = `${path}.${field}`
      if (isAgg) {
        this.aggNestedFilters.push(
          {
            range: {
              [nestedPath]: deviation,
            },
            weight,
          }
        )
      } else {
        this.nestedFilters.push(
          {
            range: {
              [nestedPath]: deviation,
            },
            weight,
          }
        )
      }
    }
  }

  nestedFiltersQuery () {
    if (this.nestedFilters.length === 0) {
      this.nestedFilters.push({
        term: {
          isRepresentative: true,
        },
      })
    }
    return {
      bool: {
        must: this.nestedFilters,
      },
    }
  }

  nestedFiltersPathQuery (path, isAgg) {
    return {
      nested: {
        path: path,
        'query': {
          'bool': {
            'must': isAgg ? this.aggNestedFilters : this.nestedFilters,
          },
        },
      },
    }
  }

  aggQuery (fieldName) {
    return {
      [fieldName]: {
        global: {},
        aggs: {
          [fieldName]: {
            filter: {
              bool: {
                must: [],
              },
            },
            aggs: {
              [fieldName]: {
                terms: {
                  field: fieldName,
                },
              },
            },
          },
          all_options: {
            filter: {
              bool: {
                must: [],
              },
            },
            aggs: {
              [fieldName]: {
                terms: {
                  field: fieldName,
                  size: 0,
                },
              },
            },
          },
        },
      },
    }
  }

  addNestedStatsAggregation (path, fieldName) {
    let nestedField = `${path}.${fieldName}`
    let aggQuery = Object.assign({}, this.aggQuery(fieldName))

    aggQuery[fieldName].aggs[fieldName].aggs[fieldName] = {
      nested: {
        path: path,
      },
      aggs: {
        [path]: {
          stats: {
            field: nestedField,
          },
        },
      },
    }

    aggQuery[fieldName].aggs.all_options.aggs[fieldName] = aggQuery[fieldName].aggs[fieldName].aggs[fieldName]

    return aggQuery
  }

  addRangeAggregation (aggQuery, fieldName, rangeName, ranges) {
    aggQuery[fieldName].aggs[rangeName] = {range: { field: fieldName, ranges: ranges }}
  }

  addStatsAggregation (fieldName) {
    let aggQuery = Object.assign({}, this.aggQuery(fieldName))
    aggQuery[fieldName].aggs[fieldName].aggs[fieldName] = {stats: { field: fieldName }}

    return aggQuery
  }

  addDefaultAggregation (fieldName) {
    let aggQuery = Object.assign({}, this.aggQuery(fieldName))

    return aggQuery
  }

  addSort (sortField, sortOrder) {
    if (sortField && sortOrder && sortField !== 'default') {
      this.sorts.push({[sortField]: sortOrder})
    }
  }

  addVariationsSort (sortField, sortOrder) {
    switch (sortField) {
    case 'comparisonRate':
    case 'minRate':
    case 'interestRate':
    case 'minimumDeposit':
    case 'personalLoanComparisonRate5Years': {
      this.sorts.push({
        [`variations.${sortField}`]: {
          'mode': 'min',
          'order': sortOrder,
          'nested_path': 'variations',
          'nested_filter': this.nestedFiltersQuery(),
        },
      })
      break
    }
    case 'baseRate':
    case 'maximumRate':
      this.sorts.push({
        [`variations.${sortField}`]: {
          'mode': 'max',
          'order': sortOrder,
          'nested_path': 'variations',
          'nested_filter': this.nestedSortFilter,
        },
      })
      break
    default:
      this.sorts.push({[sortField]: sortOrder})
    }
  }

  addSortScore (sortOrder) {
    this.sorts.push({ _score: sortOrder })
  }

  filterPromoted (products, field, param, customPromotedProducts) {
    return products.map((product) => {
      let featured = product[field]
      if (customPromotedProducts) {
        featured = this.getFeaturedScore(product, customPromotedProducts)
      }
      product[field] = param ? featured : null
      return product
    })
  }

  async fetchPromotedProducts (vertical, PromotedProductSearch, order) {
    if (!this.params.pagePath) {
      return false
    }
    let promotedProductClient = new PromotedProductSearch()
    promotedProductClient.addParams({ vertical, pagePath: this.params.pagePath, order })
    let result = await promotedProductClient.search()
    return result
  }

  getFeaturedScore (product, promotedProducts) {
    let scoreObj = promotedProducts.find((item) => item.uuid === product.uuid)
    return scoreObj ? (100 - scoreObj.order) : null
  }

  addParams (params) {
    this.params = Object.assign({}, this.params, params)
  }

  addDefaultParams () {
    this.params = Object.assign({}, this.defaultParams, this.params)
  }

  get cacheTTL () {
    return 60 * 5
  }

  get useCache () {
    return true
  }
}
