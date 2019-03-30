/**
 * Wrap controller with seal
 * @function withSeal
 */
'use strict'

const { TheInvalidParameterError } = require('the-error')

/** @lends withSeal */
function withSeal(Class) {
  class WithSeal extends Class {
    async _assertSeal(sealString, envelop) {
      const { seal } = this.app
      const ok = seal.verify(sealString, envelop)
      if (!ok) {
        throw new TheInvalidParameterError(`Invalid parameter`, envelop)
      }
    }

    async _sealFor(envelop) {
      const { seal } = this.app
      return seal.seal(envelop)
    }
  }

  return WithSeal
}

module.exports = withSeal
