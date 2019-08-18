'use strict'

/**
 * Mixin for promise
 * @memberof module:@the-/rtc.constants.mixins
 * @function promiseMix
 * @param {function()} Class
 * @returns {function()} Class
 */
function promiseMix(Class) {
  class PromiseMixed extends Class {
    async asPromise(invoke, options = {}) {
      const { label = '', timeout = 30000 } = options
      return new Promise((resolve, reject) => {
        const timeoutTimer = setTimeout(
          () =>
            reject(
              new Error(
                `[TheRTCClient]${
                  label ? `[${label}]` : label
                } Timeout occur (${timeout}ms`,
              ),
            ),
          timeout,
        )
        const resolveWrap = (result) => {
          clearTimeout(timeoutTimer)
          resolve(result)
        }
        const rejectWrap = (error) => {
          clearTimeout(timeoutTimer)
          reject(error)
        }

        invoke(resolveWrap, rejectWrap)
      })
    }
  }

  return PromiseMixed
}

module.exports = promiseMix
