/**
 * Mixin for endOf
 * @private
 * @memberOf module:@the-/date
 * @function endOf
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

/** @lends endOf */
function endOf (Class) {
  const units = [ 'year', 'month', 'quarter', 'week', 'isoWeek', 'day', 'date', 'hour', 'minute', 'second' ]

  /** @class EndOfMixed */
  class EndOfMixed extends Class {
    /**
     * Date for end of
     * @param {string} unit - Unit to endOf
     * @see https://momentjs.com/docs/#/manipulating/end-of/
     * @returns {TheDate}
     */
    endOf (unit = 'second') {
      unit = this.normalizeMomentUnits(unit)
      const unknown = !units.includes(unit)
        if (unknown) {
        throw new Error(`[TheDate] Unsupported unit: ${unit}`)
      }
      const Constructor = this.constructor
      const moment = this.toMoment()
      return new Constructor(moment.endOf(unit))
    }

    /**
     * End of year
     * @returns {TheDate}
     */
    endOfYear () {
      return this.endOf('year')
    }

    /**
     * End of month
     * @returns {TheDate}
     */
    endOfMonth () {
      return this.endOf('month')
    }

    /**
     * End of quarter
     * @returns {TheDate}
     */
    endOfQuarter () {
      return this.endOf('quarter')
    }

    /**
     * End of week
     * @returns {TheDate}
     */
    endOfWeek () {
      return this.endOf('week')
    }

    /**
     * End of isoWeek
     * @returns {TheDate}
     */
    endOfIsoWeek () {
      return this.endOf('isoWeek')
    }

    /**
     * End of day
     * @returns {TheDate}
     */
    endOfDay () {
      return this.endOf('day')
    }

    /**
     * End of date
     * @returns {TheDate}
     */
    endOfDate () {
      return this.endOf('date')
    }

    /**
     * End of hour
     * @returns {TheDate}
     */
    endOfHour () {
      return this.endOf('hour')
    }

    /**
     * End of minute
     * @returns {TheDate}
     */
    endOfMinute () {
      return this.endOf('minute')
    }

    /**
     * End of second
     * @returns {TheDate}
     */
    endOfSecond () {
      return this.endOf('second')
    }


  }
  return EndOfMixed
}

module.exports = endOf

