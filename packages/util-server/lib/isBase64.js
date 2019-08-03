'use strict'
/**
 * @function isBase64
 * @param {string} data
 * @returns {boolean}
 */
const PREFIX_PATTERN = /^data:\w+\/[a-zA-Z0-9+\-.]+;base64/

/** @lends isBase64 */
function isBase64(v) {
  if (!v) {
    return false
  }

  if (typeof v !== 'string') {
    return false
  }

  return PREFIX_PATTERN.test(v.slice(0, 100))
}

module.exports = isBase64
