/**
 * Wrap controller
 * @function withPreference
 */
'use strict'

/** @lends withPreference */
function withPreference(Class) {
  class WithPreference extends Class {
    async _getSessionPreference(name) {
      const {
        session: { preferences = {} },
      } = this
      return preferences[name]
    }

    async _setSessionPreference(name, value) {
      const {
        session: { preferences = {} },
      } = this
      this.session.preferences = { ...preferences, [name]: value }
    }
  }

  return WithPreference
}

module.exports = withPreference
