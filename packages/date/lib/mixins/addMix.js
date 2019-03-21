/**
 * Mixin for add
 * @private
 * @memberOf module:@the-/date
 * @function addMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

/** @lends addMix */
function addMix (Class) {
  const units = [ 'years', 'year', 'quarters', 'quarter', 'months', 'month', 'weeks', 'week', 'days', 'day', 'hours', 'hour', 'minutes', 'minute', 'seconds', 'second', 'milliseconds', 'millisecond' ]

  /** @class AddMixed */
  class AddMixed extends Class {
    /**
     * Date after
     * @param {number} amount to add
     * @param {string} unit - Unit to add
     * @see https://momentjs.com/docs/#/manipulating/add/
     * @returns {TheDate}
     */
    add (amount, unit = 'millisecond') {
      unit = this.normalizeMomentUnits(unit)
      const unknown = !units.includes(unit)
      if (unknown) {
        throw new Error(`[TheDate] Unsupported unit: ${unit}`)
      }
      const Constructor = this.constructor
      const moment = this.toMoment()
      return new Constructor(moment.add(amount, unit))
    }

    /**
     * Add years
     * @param {number} years to add
     * @returns {TheDate}
     */
    addYears (years) {
      return this.add(years, 'years')
    }

    /**
     * Add year
     * @param {number} year to add
     * @returns {TheDate}
     */
    addYear (year) {
      return this.add(year, 'year')
    }

    /**
     * Add quarters
     * @param {number} quarters to add
     * @returns {TheDate}
     */
    addQuarters (quarters) {
      return this.add(quarters, 'quarters')
    }

    /**
     * Add quarter
     * @param {number} quarter to add
     * @returns {TheDate}
     */
    addQuarter (quarter) {
      return this.add(quarter, 'quarter')
    }

    /**
     * Add months
     * @param {number} months to add
     * @returns {TheDate}
     */
    addMonths (months) {
      return this.add(months, 'months')
    }

    /**
     * Add month
     * @param {number} month to add
     * @returns {TheDate}
     */
    addMonth (month) {
      return this.add(month, 'month')
    }

    /**
     * Add weeks
     * @param {number} weeks to add
     * @returns {TheDate}
     */
    addWeeks (weeks) {
      return this.add(weeks, 'weeks')
    }

    /**
     * Add week
     * @param {number} week to add
     * @returns {TheDate}
     */
    addWeek (week) {
      return this.add(week, 'week')
    }

    /**
     * Add days
     * @param {number} days to add
     * @returns {TheDate}
     */
    addDays (days) {
      return this.add(days, 'days')
    }

    /**
     * Add day
     * @param {number} day to add
     * @returns {TheDate}
     */
    addDay (day) {
      return this.add(day, 'day')
    }

    /**
     * Add hours
     * @param {number} hours to add
     * @returns {TheDate}
     */
    addHours (hours) {
      return this.add(hours, 'hours')
    }

    /**
     * Add hour
     * @param {number} hour to add
     * @returns {TheDate}
     */
    addHour (hour) {
      return this.add(hour, 'hour')
    }

    /**
     * Add minutes
     * @param {number} minutes to add
     * @returns {TheDate}
     */
    addMinutes (minutes) {
      return this.add(minutes, 'minutes')
    }

    /**
     * Add minute
     * @param {number} minute to add
     * @returns {TheDate}
     */
    addMinute (minute) {
      return this.add(minute, 'minute')
    }

    /**
     * Add seconds
     * @param {number} seconds to add
     * @returns {TheDate}
     */
    addSeconds (seconds) {
      return this.add(seconds, 'seconds')
    }

    /**
     * Add second
     * @param {number} second to add
     * @returns {TheDate}
     */
    addSecond (second) {
      return this.add(second, 'second')
    }

    /**
     * Add milliseconds
     * @param {number} milliseconds to add
     * @returns {TheDate}
     */
    addMilliseconds (milliseconds) {
      return this.add(milliseconds, 'milliseconds')
    }

    /**
     * Add millisecond
     * @param {number} millisecond to add
     * @returns {TheDate}
     */
    addMillisecond (millisecond) {
      return this.add(millisecond, 'millisecond')
    }


  }
  return AddMixed
}

module.exports = addMix

