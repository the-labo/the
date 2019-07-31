'use strict'

/**
 * Get env variables
 * @memberof module:@the-/util-site
 * @function envOf
 * @param {string} - name - Name of env
 * @param {Object} [options.strict]
 */
/** @lends module:@the-/util-site.envOf */
function envOf(name, options = {}) {
  const { strict = false } = options
  const { env } = process
  const has = name in env
  if (strict && !has) {
    throw new Error(`${name} is not found`)
  }
  return env[name]
}

module.exports = envOf
