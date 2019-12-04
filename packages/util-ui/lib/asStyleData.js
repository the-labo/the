'use strict'

const combineSelectors = (...selectors) =>
  selectors
    .filter(Boolean)
    .map((selector) => String(selector).trim())
    .reduce((combined, selector) => {
      if (!combined) {
        return selector
      }

      const JOIN_PATTERN = /^&/
      if (JOIN_PATTERN.test(selector)) {
        return combined + selector.replace(JOIN_PATTERN, '')
      }

      return [combined, selector].join(' ')
    }, null)
    .trim()

const selectorData = (selector, data) => {
  const attributes = {}
  const nested = {}
  for (const key of Object.keys(data)) {
    switch (typeof data[key]) {
      case 'object': {
        nested[key] = data[key]
        break
      }
      default: {
        attributes[key] = data[key]
        break
      }
    }
  }
  return Object.assign(
    {
      [selector]: attributes,
    },
    asStyleData(selector, nested),
  )
}

/**
 * Mark  : style data
 * @memberof module:@the-/util-ui
 * @function asStyleData
 * @param {?string} scopeSelector - Selector which wraps data
 * @param {Object} data - Style data
 * @returns {Object} Style data
 */
function asStyleData(scopeSelector, data) {
  if (arguments.length === 1) {
    data = arguments[0]
    scopeSelector = null
  }
  return Object.keys(data).reduce(
    (scoped, selector) =>
      Object.assign(
        scoped,
        ...selector.split(',').map((aSelector) => {
          if (aSelector.startsWith('@')) {
            return { [selector]: data[selector] }
          }
          const created = selectorData(
            combineSelectors(scopeSelector, aSelector),
            data[selector],
          )
          return Object.keys(created).reduce(
            (result, key) => ({
              ...result,
              [key]: Object.assign({}, scoped[key] || {}, created[key]),
            }),
            {},
          )
        }),
      ),
    {},
  )
}

module.exports = asStyleData
