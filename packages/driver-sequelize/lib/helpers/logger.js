/**
 * @memberOf module:@the-/driver-sequelize.helpers
 * @name Logger
 */
'use strict'

const LogLevels = ['all', 'debug', 'info', 'warn', 'error', 'fatal']

const shouldSkip = (level) =>
  LogLevels.indexOf(level) <
  LogLevels.indexOf(process.env.THE_DRIVER_LOG_LEVEL || 'debug')

/** @lends module:@the-/driver-sequelize.helpers.Logger */
module.exports = {
  warn(msg, ...values) {
    if (shouldSkip('warn')) {
      return
    }
    console.warn('[TheDriverSequelize] ' + msg, ...values)
  },
}
