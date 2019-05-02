/**
 * Helper utility
 * @memberof module:@the-/setting
 * @namespace helpers
 */
'use strict'

exports.numberIfPossible = (val) => {
  const valAsNumber = Number(val)
  return isNaN(valAsNumber) ? val : valAsNumber
}
