'use strict'

/**
 * Extract html attributes for component props
 * @memberof module:@the-/util-ui
 * @function htmlAttributesFor
 * @param {Object} props - Component prop
 * @param {Object} [options={}]
 * @param {string[]} [options.except] - Exception names
 * @returns {Object} Props for html attributes
 */
const { SupportedProps } = require('@the-/const-ui')

const htmlAttributes = SupportedProps.htmlAttributes.split(',')

/** @lends module:@the-/util-ui.htmlAttributesFor */
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
