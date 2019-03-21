/**
 * As pon task
 * @function theResizeTask
 * @param {string} pattern
 * @param {Object} [options={}]
 */
'use strict'

const theResize = require('./lib/create')

/** @lends theResizeTask */
function theResizeTask (pattern, options = {}) {
  const { width, height = 1024, ignore } = options

  return async function task (ctx) {
    const { logger, cwd } = ctx
    const results = await theResize({
      width,
      height,
    }).overwrite(cwd, { pattern, ignore })
    for (const { filename, changed } of results) {
      if (changed) {
        logger.debug('File resized:', filename)
      }
    }
  }
}

module.exports = theResizeTask