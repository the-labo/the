'use strict'
/**
 * @memberof module:@the-/state
 * @class TheState
 * @augments RootState
 * @param {Object} [options={}] - Optional settings
 * @param {Object} [options.defaults={}] - Default values
 */
const RootState = require('./state/RootState')

/** @lends module:@the-/state.TheState */
class TheState extends RootState {
  constructor(options = {}) {
    const { defaults = {}, name } = options
    super(name, { defaults })
  }
}

module.exports = TheState
