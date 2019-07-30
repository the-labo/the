'use strict'
/**
 * @memberof module:@the-/secret.mixins
 * @function cryptoMix
 */
const { expand, flatten } = require('objnest')
const { cipherText, decipherText } = require('../helpers/cipher')
const SKIP_CRYPTO_PATTERN = /^[_$]|^\/\//

/** @lends module:@the-/secret.cryptoMix */
function cryptoMix(Class) {
  /**
   * @memberof module:@the-/secret.mixins.cryptoMix
   * @inner
   * @class CryptoMixed
   */
  class CryptoMixed extends Class {
    constructor(...args) {
      super(...args)
      this.cryptPrefix = null
    }

    decryptData(data, options = {}) {
      const { iv = null } = options
      if (!data) {
        return data
      }
      if (typeof data === 'object') {
        return expand(
          Object.assign(
            {},
            ...Object.entries(data).map(([key, value]) => ({
              [key]: this.decryptData(value, options),
            })),
          ),
        )
      }
      if (!this.isEncrypted(data)) {
        return data
      }
      const encrypted = data.substr(this.cryptPrefix.length)
      return decipherText(
        this.cryptoAlgorithm,
        this.cryptoPassword,
        encrypted,
        { iv },
      )
    }

    encryptData(data, options = {}) {
      const { iv = null } = options
      if (!data) {
        return data
      }
      if (typeof data === 'object') {
        return Object.assign(
          {},
          ...Object.entries(flatten(data)).map(([key, value]) => ({
            [key]: SKIP_CRYPTO_PATTERN.test(key)
              ? value
              : this.encryptData(value, options),
          })),
        )
      }
      if (this.isEncrypted(data)) {
        return data
      }

      return (
        this.cryptPrefix +
        cipherText(this.cryptoAlgorithm, this.cryptoPassword, data, { iv })
      )
    }

    isEncrypted(data) {
      if (typeof data !== 'string') {
        return false
      }
      return data.indexOf(this.cryptPrefix) === 0
    }

    setupCrypt({ algorithm, password, prefix }) {
      this.cryptPrefix = prefix
      this.cryptoAlgorithm = algorithm
      this.cryptoPassword = password
    }
  }

  return CryptoMixed
}

module.exports = cryptoMix
