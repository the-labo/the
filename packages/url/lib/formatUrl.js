/**
 * Format urls
 * @memberof module:@the-/url
 * @function formatUrl
 * @param {string} urlString - URL format string
 * @param {Object} [params={}] - Params to inject
 * @returns {string} Formatted string
 */
'use strict'

const { format, parse } = require('url')
const { unlessProduction } = require('@the-/check')
const PARAM_PREFIX = /^:/

/** @lends formatUrl */
function formatUrl(urlString, params = {}) {
  const { host, pathname, protocol, search } = parse(urlString)
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
  const formatted = format({
    host,
    pathname: pathname
      .split(/\//g)
      .map(injectParams)
      .join('/'),
    protocol,
    search:
      search &&
      search
        .split('&')
        .map((keyValue) => {
          const [key, value] = keyValue.split('=')
          return [key, value].map(injectParams).join('=')
        })
        .join('&'),
  })

  unlessProduction(() => {
    for (const name of paramsKeys) {
      if (!replaced.hasOwnProperty(name)) {
        console.warn(
          `[the-url] Parameter \`${name}\` is never used ( for \`${urlString}\` )`,
        )
      }
    }
  })

  return formatted
}

module.exports = formatUrl
