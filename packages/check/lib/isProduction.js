/**
 * Do unless production env
 * @memberof module:@the-/check
 * @function isProduction
 * @returns {Boolean} Is production or not
 */
'use strict'

const { isProduction } = require('asenv')

module.exports = isProduction
