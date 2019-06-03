/**
 * As pon task
 * @module @the-/icon/pon
 */
/**
 * As pon task
 * @memberof module:@the-/icon/pon
 * @function icon
 * @param {string} pattern
 * @param {Object} [options={}]
 * @returns {function()} Task function
 */
'use strict'

const path = require('path')
const theIcon = require('./lib/create')
const Themes = require('./lib/Themes')

/** @lends module:@the-/icon/pon.icon */
function icon(filename, config) {
  return async function task(ctx) {
    const { logger } = ctx
    await theIcon(config).saveAs(filename)
    logger.debug('File generated:', path.relative(process.cwd(), filename))
  }
}

module.exports = Object.assign(icon, { Themes, icon })
