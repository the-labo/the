/**
 * Compound tow locales
 * @private
 * @memberOf module:@the-/loc
 * @function toCompoundLocale
 * @param {Object}
 * @returns {Object}
 */
'use strict'

const { flatten } = require('objnest')

/** @lends toCompoundLocale */
function toCompoundLocale(src) {
  return Object.assign(
    {},
    ...Object.keys(src)
      .reduce((kv, lang) => {
        const data = flatten(src[lang])
        return [
          ...kv,
          ...Object.keys(data).map((name) => [`${name}*${lang}`, data[name]]),
        ]
      }, [])
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => ({
        [k]: v,
      })),
  )
}

module.exports = toCompoundLocale
