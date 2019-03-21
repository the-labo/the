/**
 * Check locales
 * @private
 * @memberOf module:@the-/loc
 * @function checkLocales
 * @param {Object}
 * @returns {Object}
 */
'use strict'

const { flatten } = require('objnest')
const { uniqueFilter } = require('the-array')

/** @lends checkLocales */
function checkLocales(src) {
  const langs = Object.keys(src).filter((name) => !/^\$\$/.test(name))
  const data = Object.assign(
    {},
    ...langs.map((lang) => ({
      [lang]: flatten(src[lang]),
    })),
  )

  const keypaths = langs
    .map((lang) => Object.keys(data[lang]))
    .reduce(
      (combined, found) => [...combined, ...found].filter(uniqueFilter()),
      [],
    )

  const failures = []
  for (const keypath of keypaths) {
    for (const lang of langs) {
      const has = keypath in data[lang]
      if (!has) {
        failures.push({
          missing: { keypath, lang },
        })
      }
    }
  }
  return failures.length > 0 ? failures : null
}

module.exports = checkLocales
