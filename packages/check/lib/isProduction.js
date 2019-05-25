'use strict'
/**
 * Do unless production env
 * @memberof module:@the-/check
 * @function isProduction
 * @returns {boolean} Is production or not
 */
const { isProduction } = require('asenv')

module.exports = isProduction
