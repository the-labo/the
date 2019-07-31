'use strict'

/**
 * @memberof module:@the-/server.helpers
 * @function toLowerKeys
 */
/** @lends module:@the-/server.helpers.toLowerKeys */
function toLowerKeys(values = {}) {
  return Object.keys(values).reduce(
    (result, name) =>
      Object.assign(result, {
        [String(name).toLowerCase()]: values[name],
      }),
    {},
  )
}

module.exports = toLowerKeys
