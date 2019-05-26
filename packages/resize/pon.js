'use strict'
/**
 * As pon task
 * @function theResizeTask
 * @param {string} pattern
 * @param {Object} [options={}]
 */
const theResize = require('./lib/create')

/** @lends theResizeTask */
function theResizeTask(pattern, options = {}) {
  const { height = 1024, ignore, width } = options

  return async function task(ctx) {
    const { cwd, logger } = ctx
    const results = await theResize({
      height,
      width,
    }).overwrite(cwd, { ignore, pattern })
    for (const { changed, filename } of results) {
      if (changed) {
        logger.debug('File resized:', filename)
      }
    }
  }
}

module.exports = theResizeTask
