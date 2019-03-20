/**
 * Do unless production env
 * @function isProduction
 * @returns {Boolean} Is production or not
 */
'use strict'

const { isProduction } = require('asenv')

module.exports = isProduction
