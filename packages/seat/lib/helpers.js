'use strict'

/**
 * Helper utility
 * @memberof module:@the-/seat
 * @namespace helpers
 */
const crypto = require('crypto')

exports.numberIfPossible = (val) => {
  const valAsNumber = Number(val)
  return isNaN(valAsNumber) ? val : valAsNumber
}

exports.randomString = (byteLength) =>
  crypto.randomBytes(byteLength).toString('hex')

exports.handleUnknownOptions = (options) => {
  const restKeys = Object.keys(options)
  if (restKeys.length > 0) {
    console.warn(`[TheSeat] Unknown options: ${JSON.stringify(restKeys)}`)
  }
}
