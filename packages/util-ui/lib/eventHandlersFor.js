/**
 * Extract event handlers for component props
 * @function eventHandlersFor
 * @param {Object} props - Component prop
 * @param {Object} [options={}]
 * @param {string[]} [options.except] - Exception names
 * @returns {Object} Props for html attributes
 */
'use strict'

const { SupportedProps } = require('@the-/const-ui')

const handlerNames = [
  ...SupportedProps.mouseEvents.split(','),
  ...SupportedProps.selectionEvents.split(','),
  ...SupportedProps.touchEvents.split(','),
  ...SupportedProps.uiEvents.split(','),
  ...SupportedProps.mediaEvents.split(','),
  ...SupportedProps.imageEvents.split(','),
]

/** @lends eventHandlersFor */
function eventHandlersFor(props, options = {}) {
  let { except = [] } = options
  return Object.keys(props)
    .filter((name) => !except.includes(name))
    .filter((name) => handlerNames.includes(name))
    .reduce(
      (results, name) =>
        Object.assign(results, {
          [name]: props[name],
        }),
      {},
    )
}

module.exports = eventHandlersFor
