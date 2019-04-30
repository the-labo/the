/**
 * Mixin for set
 * @protected
 * @memberOf module:@the-/date.mixins
 * @function setMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

/** @lends module:@the-/date.mixins.setMix */
function setMix (Class) {
  const units = [ 'year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond' ]

  /**
   * @memberOf module:@the-/date.mixins.setMix
   * @inner
   * @class SetMixed
   */
  class SetMixed extends Class {
    /**
     * Set value of
     * @param {Object} values - Values to set
     * @see https://momentjs.com/docs/#/set-set/set/
     * @returns {TheDate}
     */
    /**
     * Set value of
     * @param {string} key - Values to set
     * @param {number} value - Values to set
     * @see https://momentjs.com/docs/#/set-set/set/
     * @returns {TheDate}
     */
    set (values) {
      if (arguments.length === 2) {
        let [unit, value] = arguments
        unit = this.normalizeMomentUnits(unit)
        const unknown = !units.includes(unit)
        if (unknown) {
          throw new Error(`[TheDate] Unsupported unit: ${unit}`)
        }
        return this.set({[unit]: value})
      }
      const moment = this.toMoment()
      this.date = moment.set(values).toDate()
    }

    /**
     * Set year
     * @param {number} value
     * @returns {TheDate}
     */
    setYear (value) {
      return this.set({'year': value})
    }

    /**
     * Set month
     * @param {number} value
     * @returns {TheDate}
     */
    setMonth (value) {
      return this.set({'month': value})
    }

    /**
     * Set date
     * @param {number} value
     * @returns {TheDate}
     */
    setDate (value) {
      return this.set({'date': value})
    }

    /**
     * Set hour
     * @param {number} value
     * @returns {TheDate}
     */
    setHour (value) {
      return this.set({'hour': value})
    }

    /**
     * Set minute
     * @param {number} value
     * @returns {TheDate}
     */
    setMinute (value) {
      return this.set({'minute': value})
    }

    /**
     * Set second
     * @param {number} value
     * @returns {TheDate}
     */
    setSecond (value) {
      return this.set({'second': value})
    }

    /**
     * Set millisecond
     * @param {number} value
     * @returns {TheDate}
     */
    setMillisecond (value) {
      return this.set({'millisecond': value})
    }


  }
  return SetMixed
}

module.exports = setMix

