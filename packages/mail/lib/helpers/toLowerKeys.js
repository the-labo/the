/**
 * @function toLowerKeys
 */
'use strict'

const { snakecase } = require('stringcase')

/** @lends toLowerKeys */
function toLowerKeys(obj = {}) {
  return Object.keys(obj).reduce(
    (result, name) =>
      Object.assign(result, {
        [snakecase(name).toLowerCase()]: obj[name],
      }),
    {},
  )
}

module.exports = toLowerKeys
