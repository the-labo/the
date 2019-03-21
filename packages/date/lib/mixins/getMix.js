/**
 * Mixin for get
 * @private
 * @memberOf module:@the-/date
 * @function getMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

/** @lends getMix */
function getMix (Class) {
  const units = [ 'year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond' ]
  /** @class GetMixed */
  class GetMixed extends Class {
    /**
     * Get value of
     * @param {string} unit - Unit to get
     * @see https://momentjs.com/docs/#/get-set/get/
     * @returns {number}
     */
    get (unit = 'millisecond') {
      unit = this.normalizeMomentUnits(unit)
      const unknown = !units.includes(unit)
        if (unknown) {
        throw new Error(`[TheDate] Unsupported unit: ${unit}`)
      }
      const moment = this.toMoment()
      return moment.get(unit)
    }

    /**
     * Get year
     * @returns {TheDate}
     */
    getYear () {
      return this.get('year')
    }

    /**
     * Get month
     * @returns {TheDate}
     */
    getMonth () {
      return this.get('month')
    }

    /**
     * Get date
     * @returns {TheDate}
     */
    getDate () {
      return this.get('date')
    }

    /**
     * Get hour
     * @returns {TheDate}
     */
    getHour () {
      return this.get('hour')
    }

    /**
     * Get minute
     * @returns {TheDate}
     */
    getMinute () {
      return this.get('minute')
    }

    /**
     * Get second
     * @returns {TheDate}
     */
    getSecond () {
      return this.get('second')
    }

    /**
     * Get millisecond
     * @returns {TheDate}
     */
    getMillisecond () {
      return this.get('millisecond')
    }


  }
  return GetMixed
}

module.exports = getMix

