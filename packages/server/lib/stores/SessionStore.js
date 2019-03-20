/**
 * Client session store for the-server
 * @class SessionStore
 */
'use strict'

const Store = require('./Store')
const DefaultValues = require('../constants/DefaultValues')
const SESSION_STORE_KEY = 'the:server:session'

/** @lends SessionStore */
class SessionStore extends Store {
  constructor(storage, options = {}) {
    const {
      cleanupInterval = DefaultValues.SESSION_CLEANUP_INTERVAL,
      expireDuration = DefaultValues.SESSION_EXPIRE_DURATION,
    } = options
    super(storage, {
      cleanupInterval,
      expireDuration,
      storeKey: SESSION_STORE_KEY,
    })
  }
}

module.exports = SessionStore
