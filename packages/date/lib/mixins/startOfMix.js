/**
 * Mixin for startOf
 * @private
 * @memberOf module:@the-/date
 * @function startOf
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

/** @lends startOf */
function startOf (Class) {
  const units = [ 'year', 'month', 'quarter', 'week', 'isoWeek', 'day', 'date', 'hour', 'minute', 'second' ]

  /** @class StartOfMixed */
  class StartOfMixed extends Class {
    /**
     * Date for start of
     * @param {string} unit - Unit to startOf
     * @see https://momentjs.com/docs/#/manipulating/start-of/
     * @returns {TheDate}
     */
    startOf (unit = 'milliseconds') {
      unit = this.normalizeMomentUnits(unit)
      const unknown = !units.includes(unit)
        if (unknown) {
          throw new Error(`[TheDate] Unsupported unit: ${unit}`)
      }
      const Constructor = this.constructor
      const moment = this.toMoment()
      return new Constructor(moment.startOf(unit))
    }

    /**
     * Start of year
     * @returns {TheDate}
     */
    startOfYear () {
      return this.startOf('year')
    }

    /**
     * Start of month
     * @returns {TheDate}
     */
    startOfMonth () {
      return this.startOf('month')
    }

    /**
     * Start of quarter
     * @returns {TheDate}
     */
    startOfQuarter () {
      return this.startOf('quarter')
    }

    /**
     * Start of week
     * @returns {TheDate}
     */
    startOfWeek () {
      return this.startOf('week')
    }

    /**
     * Start of isoWeek
     * @returns {TheDate}
     */
    startOfIsoWeek () {
      return this.startOf('isoWeek')
    }

    /**
     * Start of day
     * @returns {TheDate}
     */
    startOfDay () {
      return this.startOf('day')
    }

    /**
     * Start of date
     * @returns {TheDate}
     */
    startOfDate () {
      return this.startOf('date')
    }

    /**
     * Start of hour
     * @returns {TheDate}
     */
    startOfHour () {
      return this.startOf('hour')
    }

    /**
     * Start of minute
     * @returns {TheDate}
     */
    startOfMinute () {
      return this.startOf('minute')
    }

    /**
     * Start of second
     * @returns {TheDate}
     */
    startOfSecond () {
      return this.startOf('second')
    }


  }
  return StartOfMixed
}

module.exports = startOf

