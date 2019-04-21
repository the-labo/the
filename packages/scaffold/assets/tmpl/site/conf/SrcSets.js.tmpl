/**
 * Source url set
 * @module SrcSets
 */
'use strict'

const { isProduction } = require('@the-/check')
const theHash = require('@the-/hash')
const Urls = require('./Urls')

module.exports = Object.freeze(
  /** @lends SrcSets */
  {
    cssSet: [
      Urls.CSS_THEME_URL,
      Urls.CSS_NORMALIZE_URL,
      Urls.CSS_FONT_URL,
      Urls.CSS_FLATPICKR_URL,
      ...(isProduction() ? [Urls.PROD_CSS_BUNDLE_URL] : [Urls.CSS_BUNDLE_URL]),
    ],
    jsSet: [
      Urls.JS_SHIM_URL,
      ...(isProduction() ? [Urls.PROD_JS_BUNDLE_URL] : [Urls.JS_BUNDLE_URL]),
    ],
  },
)

if (!isProduction()) {
  module.exports = theHash.proxy(module.exports, {
    name: 'SrcSets',
    unknownCheck: true,
  })
}
