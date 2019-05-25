'use strict'
/**
 * Timezone names
 * @memberof module:@the-/date
 * @type {string} []
 */
const { tz } = require('moment-timezone')

const Timezones = tz.names()

module.exports = Timezones
