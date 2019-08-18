'use strict'

const RootState = require('./state/RootState')

/**
 * @memberof module:@the-/state
 * @class TheState
 * @augments RootState
 * @param {Object} [options={}] - Optional settings
 * @param {Object} [options.defaults={}] - Default values
 */
class TheState extends RootState {
  constructor(options = {}) {
    const { defaults = {}, name } = options
    super(name, { defaults })
  }
}

module.exports = TheState
