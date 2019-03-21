/**
 * Seal handler
 * @class TheSeal
 * @param {string} secret - Secret password
 * @param {Object} [options={}] - Optional settings
 * @param {string} [options.algorithm='sha512'] - Hash algorithm
 */
'use strict'

const abind = require('abind')
const crypto = require('crypto')
const { stringify } = require('qs')

/** @lends TheSeal */
class TheSeal {
  constructor(secret, options = {}) {
    const { algorithm = 'sha512' } = options
    this._secret = secret
    this._algorithm = algorithm
    abind(this)
  }

  /**
   * Seal values
   * @param {Object} values
   * @returns {string} seal string
   */
  seal(values) {
    const { _algorithm: algorithm, _secret: secret } = this
    return crypto
      .createHash(algorithm)
      .update(stringify(values) + secret)
      .digest('hex')
  }

  /**
   * Verify sealed
   * @param {string} sealString - Seal string
   * @param {Object} values - Values to verify
   * @returns {Boolean} Valid or not
   */
  verify(sealString, values) {
    return this.seal(values) === sealString
  }
}

module.exports = TheSeal
