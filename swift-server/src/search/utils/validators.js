export function greaterThan (value) {
  return function (testValue) {
    return testValue > value
  }
}

export function lessThan (value) {
  return function (testValue) {
    return testValue < value
  }
}

export function oneOf (items) {
  return function (value) {
    return items.indexOf(value) === -1 ? null : value
  }
}

export function parseBool (value) {
  if (typeof value === 'undefined') {
    return null
  }
  return value === 'true' || value === true
}

export function parseString (value) {
  if (typeof value === 'undefined') {
    return null
  }
  return decodeURIComponent(value)
}
