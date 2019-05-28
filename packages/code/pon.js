'use strict'
/**
 * As pon task
 * @module @the-/code/pon
 */
/**
 * As pon task
 * @memberof module:@the-/code/pon
 * @function code
 * @param {string} pattern
 * @param {Object} [options={}]
 * @returns {function()} Task function
 */
const path = require('path')
const theCode = require('./lib/create')

/** @lends module:@the-/code/pon.code */
function code(pattern, options = {}) {
  const { ignore = [], ...config } = options
  return async function task(ctx) {
    const { logger } = ctx
    try {
      const results = await theCode(config).format(pattern, { ignore })
      const filenames = results
        .filter(({ skipped }) => !skipped)
        .map(({ filename }) => path.relative(process.cwd(), filename))
      for (const filename of filenames) {
        logger.debug('File formatted:', filename)
      }
      return filenames
    } catch (e) {
      const { message, stack } = e
      logger.error(`${message}\n${stack}`)
    }
  }
}

module.exports = Object.assign(code, { code })
