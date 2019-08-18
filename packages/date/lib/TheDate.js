'use strict'

const abind = require('abind')
const {
  addMix,
  endOfMix,
  getMix,
  momentMix,
  setMix,
  startOfMix,
  subtractMix,
} = require('./mixins')

const now = () => new Date()

/**
 * @memberof module:@the-/date
 * @class TheDateBase
 * @protected
 */
const TheDateBase = [
  addMix,
  getMix,
  setMix,
  endOfMix,
  momentMix,
  startOfMix,
  subtractMix,
].reduce((Class, mix) => mix(Class), class Base {})

/**
 * Date manipulator
 * @memberof module:@the-/date
 * @class TheDate
 * @augments module:@the-/date.mixins.addMix~AddMixed
 * @augments module:@the-/date.mixins.endOfMix~EndOfMixed
 * @augments module:@the-/date.mixins.getMix~GetMixed
 * @augments module:@the-/date.mixins.momentMix~MomentMixed
 * @augments module:@the-/date.mixins.setMix~SetMixed
 * @augments module:@the-/date.mixins.startOfMix~StartOfMixed
 * @augments module:@the-/date.mixins.subtractMix~SubtractMixed
 * @augments module:@the-/date.TheDateBase
 */
class TheDate extends TheDateBase {
  static with(options) {
    return new this(new Date(), options)
  }

  constructor(date = now(), options = {}) {
    super()
    const { lang, timezone } = options
    this.date = date && date.toDate ? date.toDate() : date
    this.lang = lang
    this.timezone = timezone
    abind(this)
  }

  /**
   * Format into string
   * @param {string} format
   * @returns {?string} - Formatted string
   */
  format(format) {
    const moment = this.toMoment()
    return moment ? moment.format(format) : null
  }

  /**
   * Date string from now
   * @returns {?string}
   */
  fromNow() {
    const moment = this.toMoment()
    return moment ? moment.fromNow() : null
  }

  /**
   * Covert into date
   * @returns {Date}
   */
  toDate() {
    return new Date(this.date)
  }

  /**
   * Convert into JSON String
   * @returns {string}
   */
  toJSON() {
    return this.toDate().toString()
  }

  /**
   * Convert to number
   * @returns {number}
   */
  toNumber() {
    return Number(this.toDate())
  }

  /**
   * Convert into string
   * @returns {string}
   */
  toString() {
    return this.toDate().toString()
  }
}

module.exports = TheDate
