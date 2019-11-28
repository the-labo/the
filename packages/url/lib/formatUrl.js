'use strict'

const { get } = require('bwindow')
const { unlessProduction } = require('@the-/check-env')

const PARAM_PREFIX = /^:/

/**
 * Format urls
 * @memberof module:@the-/url
 * @function formatUrl
 * @param {string} urlString - URL format string
 * @param {Object} [params={}] - Params to inject
 * @returns {string} Formatted string
 */
function formatUrl(urlString, params = {}) {
  const isRelative = urlString.match(/^\//)
  const url = isRelative
    ? new URL(urlString, get('location.origin') || 'relative:///')
    : new URL(urlString)
  const { pathname, search } = url
  const paramsKeys = Object.keys(params)
  const replaced = {}
  const injectParams = (c) => {
    if (PARAM_PREFIX.test(c)) {
      const componentKey = c.replace(PARAM_PREFIX, '').split('.')
      const [name, ...extensions] = componentKey
      if (!paramsKeys.includes(name)) {
        unlessProduction(() =>
          console.warn(
            `[the-url] Failed to resolve \`${c}\` ( in \`${urlString}\` )`,
          ),
        )
        return c
      }

      const value = encodeURIComponent(params[name])
      replaced[name] = value
      return [value, ...extensions].join('.')
    }

    return c
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
      // eslint-disable-next-line no-prototype-builtins
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
