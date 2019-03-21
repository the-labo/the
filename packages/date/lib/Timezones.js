/**
 * Timezone names
 * @type {string} []
 */
'use strict'

const { tz } = require('moment-timezone')

const Timezones = tz.names()

module.exports = Timezones
