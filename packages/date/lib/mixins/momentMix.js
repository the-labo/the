'use strict'

const moment = require('moment')
const momentTz = require('moment-timezone')

require('moment/locale/ja')
require('moment/locale/en-au')
require('moment/locale/en-ca')
require('moment/locale/en-gb')
require('moment/locale/en-ie')
require('moment/locale/en-nz')

/**
 * Mixin for moment
 * @memberof module:@the-/date.mixins
 * @function momentMix
 * @param {function()} Class
 * @returns {function()} Class
 */
function momentMix(Class) {
  /**
   * @memberof module:@the-/date.mixins.momentMix
   * @class MomentMixed
   * @inner
   */
  class MomentMixed extends Class {
    normalizeMomentUnits(unit) {
      return moment.normalizeUnits(unit)
    }

    /**
     * Moment to date
     * @returns {Object} moment instance
     */
    toMoment() {
      const { date } = this
      if (!date) {
        return null
      }

      const { lang, timezone } = this
      moment.locale(lang)
      if (timezone) {
        return moment(momentTz(new Date(date)).tz(timezone))
      } else {
        return moment(new Date(date))
      }
    }
  }

  return MomentMixed
}

module.exports = momentMix
