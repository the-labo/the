'use strict'
/**
 * As pon task
 * @module @the-/jsdoc/pon
 */
/**
 * As pon task
 * @memberof module:@the-/jsdoc/pon
 * @function jsdoc
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 * @param {string} pattern
 * @param {Object} [options={}]
 * @returns {function()} Task function
 */
const theJSDoc = require('./lib/create')

/** @lends module:@the-/jsdoc/pon.jsdoc */
function jsdoc(src, dest, options = {}) {
  const {
    ignore = [],
    jsonFile = 'jsdoc.json',
    mdFile = 'api.md',
    patterns,
    prefix = '@the-/jsdoc',
  } = options
  return async function task(ctx) {
    const { logger } = ctx
    try {
      await theJSDoc({
        logging: (...args) => ctx.logger.debug(...args),
        prefix,
      }).generate(src, dest, { ignore, jsonFile, mdFile, patterns })
    } catch (e) {
      logger.error(e.message || e)
    }
  }
}

module.exports = Object.assign(jsdoc, {
  jsdoc,
})
