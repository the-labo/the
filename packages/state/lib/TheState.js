/**
 * @class TheState
 * @extends RootState
 * @param {Object} [options={}] - Optional settings
 * @param {Object} [options.defaults={}] - Default values
 */
'use strict'

const RootState = require('./state/RootState')

/** @lends TheState */
class TheState extends RootState {
  constructor (options = {}) {
    const { defaults = {}, name } = options
    super(name, { defaults })
  }
}

module.exports = TheState
