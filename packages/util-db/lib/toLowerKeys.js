/**
 * Make object keys to lower
 * @function toLowerKeys
 * @param {Object} obj
 * @returns {Object}
 */
'use strict'

const { snakecase } = require('stringcase')

/** @lends toLowerKeys */
function toLowerKeys(obj = {}) {
  return Object.keys(obj).reduce(
    (result, name) => ({
      ...result,
      [snakecase(name).toLowerCase()]: obj[name],
    }),
    {},
  )
}

module.exports = toLowerKeys
