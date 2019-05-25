'use strict'
/**
 * Format urls
 * @memberof module:@the-/url
 * @function formatUrl
 * @param {string} urlString - URL format string
 * @param {Object} [params={}] - Params to inject
 * @returns {string} Formatted string
 */
const { unlessProduction } = require('@the-/check')
const { get } = require('@the-/window')
const PARAM_PREFIX = /^:/

/** @lends formatUrl */
function formatUrl(urlString, params = {}) {
  const isRelative = urlString.match(/^\//)
  const url = isRelative
    ? new URL(urlString, get('location.origin') || 'relative:///')
    : new URL(urlString)
  const { pathname, search } = url
  const paramsKeys = Object.keys(params)
  const replaced = {}
  const injectParams = (componnet) => {
    if (PARAM_PREFIX.test(componnet)) {
      const componentKey = componnet.replace(PARAM_PREFIX, '').split('.')
      const [name, ...extensions] = componentKey
      if (!paramsKeys.includes(name)) {
        unlessProduction(() =>
          console.warn(
            `[the-url] Failed to resolve \`${componnet}\` ( in \`${urlString}\` )`,
          ),
        )
        return componnet
      }
      const value = encodeURIComponent(params[name])
      replaced[name] = value
      return [value, ...extensions].join('.')
    }
    return componnet
  }
  url.pathname = pathname
    .split(/\//g)
    .map(injectParams)
    .join('/')
  url.search =
    search &&
    search
      .split('&')
      .map((keyValue) => {
        const [key, value] = keyValue.split('=')
        return [key, value].map(injectParams).join('=')
      })
      .join('&')

  unlessProduction(() => {
    for (const name of paramsKeys) {
      if (!replaced.hasOwnProperty(name)) {
        console.warn(
          `[the-url] Parameter \`${name}\` is never used ( for \`${urlString}\` )`,
        )
      }
    }
  })

  return isRelative ? [url.pathname, url.search].join('') : url.href
}

module.exports = formatUrl
