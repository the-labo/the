/**
 * @function errorMix
 * @memberOf module:@the-/scene.mixins
 * @param {function} BaseClass
 * @returns {function} MixedClass
 */
'use strict'

/** @lends module:@the-/scene.mixins.errorMix */
function errorMix(BaseClass) {
  /**
   * @memberOf module:@the-/scene.mixins.goMix
   * @inner
   */
  class ErrorMixed extends BaseClass {
    catchEntryError(err) {
      switch (err.name) {
        case 'PolicyError': {
          return this.parsePolicyError(err)
        }
        default:
          throw err
      }
    }

    parseAppError(err, options = {}) {
      const { l } = this
      let { field, messageKey = options.defaultMessageKey } = err.detail
      return {
        [field]: l('errors', messageKey),
      }
    }

    parsePolicyError(err) {
      const { l } = this
      const { conflict = {}, failures = {}, missing = [] } = err.detail
      const messages = {}
      for (const name of Object.keys(failures)) {
        const failure = failures[name]
        messages[name] = l('errors', failure.reason, failure)
      }
      for (const name of Object.keys(conflict)) {
        messages[name] = l('errors', 'UNIQUE_VIOLATION_ERROR', {
          value: conflict[name],
        })
      }
      for (const name of missing) {
        messages[name] = l('errors', 'VALUE_MISSING_ERROR')
      }
      return messages
    }
  }

  return ErrorMixed
}

module.exports = errorMix
