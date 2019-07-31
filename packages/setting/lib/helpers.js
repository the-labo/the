'use strict'

/**
 * Helper utility
 * @memberof module:@the-/setting
 * @namespace helpers
 */
exports.numberIfPossible = (val) => {
  const valAsNumber = Number(val)
  return isNaN(valAsNumber) ? val : valAsNumber
}
