/**
 * Extract html attributes for component props
 * @function htmlAttributesFor
 * @param {Object} props - Component prop
 * @param {Object} [options={}]
 * @param {string[]} [options.except] - Exception names
 * @returns {Object} Props for html attributes
 */
'use strict'

const { SupportedProps } = require('the-component-constants')

const htmlAttributes = SupportedProps.htmlAttributes.split(',')

/** @lends htmlAttributesFor */
function htmlAttributesFor(props, options = {}) {
  const { except = [] } = options
  return Object.keys(props)
    .filter((name) => !except.includes(name))
    .filter(
      (name) =>
        htmlAttributes.includes(name) ||
        /^data-.+/.test(name) ||
        /^aria-.+/.test(name),
    )
    .reduce(
      (results, name) =>
        Object.assign(results, {
          [name]: props[name],
        }),
      {},
    )
}

module.exports = htmlAttributesFor
