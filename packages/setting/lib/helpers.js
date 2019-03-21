/**
 * Helper utility
 */
'use strict'

exports.numberIfPossible = (val) => {
  const valAsNumber = Number(val)
  return isNaN(valAsNumber) ? val : valAsNumber
}
