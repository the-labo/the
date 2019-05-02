/**
 * Define koa middleware function to detect locale
 * @memberof module:@the-/server.helpers
 * @function langDetector
 * @param {string[]} [locales='en'] - Supported locales
 * @param {Object} [options={}] - Optional setting
 * @returns {function}
 */
'use strict'

const { Locales } = require('locale')

/** @lends module:@the-/server.helpers.langDetector */
function langDetector(locales, options = {}) {
  const { queryKey = 'locale' } = options

  const supported = new Locales(locales, locales[0])
  return async function middleware(ctx, next) {
    const specified = ctx.query[queryKey] || ctx.get('accept-language')
    const detected = new Locales(specified).best(supported)
    ctx.lang = detected.language
    await next()
  }
}

module.exports = langDetector
