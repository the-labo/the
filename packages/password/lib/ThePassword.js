/**
 * @memberOf module:@the-/password
 * @class ThePassword
 */
'use strict'

const abind = require('abind')
const crypto = require('crypto')

/** @lends module:@the-/password.ThePassword */
class ThePassword {
  constructor(options = {}) {
    if (options.algorithm) {
      console.warn(
        `[the-password] Passing algorithm on constructor is now deprecated`,
      )
    }
    const { algorithm = 'sha1' } = options
    this.defaultAlgorithm = algorithm
    abind(this)
  }

  digest(password, salt, options = {}) {
    const { algorithm = this.defaultAlgorithm, stretching = 1 } = options
    if (stretching === 1) {
      console.warn('[the-password] Should set stretching option for safety')
    }
    let hashed = password
    let count = stretching > 0 ? stretching : 1
    while (count--) {
      hashed = this._digest(hashed, salt, { algorithm })
    }
    return hashed
  }

  generatePassword() {
    return crypto.randomBytes(6).toString('base64')
  }

  generateSalt() {
    return crypto.randomBytes(32).toString('base64')
  }

  _digest(key, salt, { algorithm } = {}) {
    return crypto
      .createHmac(algorithm, salt)
      .update(String(key))
      .digest('hex')
      .toString()
  }
}

module.exports = ThePassword
