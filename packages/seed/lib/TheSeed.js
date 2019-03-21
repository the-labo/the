/**
 * @class TheSeed
 */
'use strict'

const abind = require('abind')
const argx = require('argx')
const evaljson = require('evaljson')
const Faker = require('faker/lib')
const locales = require('faker/lib/locales')

/** @lends TheSeed */
class TheSeed {
  constructor(locale = 'en', options) {
    const args = argx(arguments)
    options = args.pop('object') || {}
    const localeName = args.shift('string') || options.locale
    const { vars = {} } = options
    if (!locales[localeName]) {
      throw new Error(
        `[TheSeed] Unknown locale: "${localeName}" (Available: ${Object.keys(
          locales,
        ).join(',')})`,
      )
    }
    this.faker = new Faker({ locale: localeName, locales })
    this.vars = vars

    abind(this)
  }

  /**
   * Generate data with seed
   * @param {Object} seed
   */
  apply(seed) {
    return this.explode(seed, 1).shift()
  }

  /**
   * Generate data with seed
   * @param {Object} seed
   * @param {number} [counts=10]
   * @returns {Object[]}
   */
  explode(seed, counts = 10) {
    const { faker, vars } = this
    return new Array(counts).fill(null).map((_, i) => {
      const context = { faker, ...faker, i, index: i, ...vars }
      const entry = Object.assign(
        {},
        ...Object.entries(seed).map(([k, v]) => ({
          [k]: typeof v === 'function' ? v(context) : v,
        })),
      )
      return evaljson(entry, context)
    })
  }
}

module.exports = TheSeed
