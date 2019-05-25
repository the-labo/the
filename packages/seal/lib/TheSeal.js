'use strict'
/**
 * Seal handler
 * @memberof module:@the-/seal
 * @class TheSeal
 * @param {string} secret - Secret password
 * @param {Object} [options={}] - Optional settings
 * @param {string} [options.algorithm='sha512'] - Hash algorithm
 */
const abind = require('abind')
const crypto = require('crypto')
const { stringify } = require('qs')

/** @lends module:@the-/seal.TheSeal */
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
   * @returns {boolean} Valid or not
   */
  verify(sealString, values) {
    return this.seal(values) === sealString
  }
}

module.exports = TheSeal
