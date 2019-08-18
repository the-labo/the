'use strict'

/**
 * @memberof module:@the-/server.helpers
 * @function toLowerKeys
 * @param [values={}]
 * @returns {*}
 */
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
