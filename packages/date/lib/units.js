'use strict'

/**
 * Date units
 * @memberof module:@the-/date
 * @namespace units
 */
const Durations = require('./Durations')

module.exports = {
  days(amount) {
    return Durations.ONE_DAY * amount
  },
  hours(amount) {
    return Durations.ONE_HOUR * amount
  },
  minutes(amount) {
    return Durations.ONE_MINUTE * amount
  },
}
