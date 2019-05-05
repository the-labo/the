/**
 * As pon task
 * @function theCodeTask
 * @param {string} pattern
 * @param {Object} [options={}]
 * @returns {function()} Task function
 */
'use strict'

const path = require('path')
const theCode = require('./lib/create')

/** @lends theCodeTask */
function theCodeTask(pattern, options = {}) {
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
      logger.error(e.message || e)
    }
  }
}

module.exports = theCodeTask
