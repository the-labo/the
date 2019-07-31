'use strict'

/**
 * Wrap controller with seal
 * @function withAuthorized
 */
const { TheUnauthorizedError } = require('@the-/error')

/** @lends withAuthorized */
function withAuthorized(Class) {
  class WithAuthorized extends Class {
    // noinspection JSMethodCanBeStatic
    _throwUnauthorizedError() {
      throw new TheUnauthorizedError('Needs to be authorized')
    }

    async _assertAuthorized() {
      const authorized = await this._getAuthorized()
      if (!authorized) {
        this._throwUnauthorizedError()
      }
    }

    async _delAuthorized() {
      this.session.authorized = false
    }

    async _getAuthorized() {
      return this.session.authorized || false
    }

    async _setAuthorized(authorized) {
      this.session.authorized = authorized
    }
  }

  return WithAuthorized
}

module.exports = withAuthorized
