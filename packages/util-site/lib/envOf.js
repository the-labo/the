'use strict'

/**
 * Get env variables
 * @memberof module:@the-/util-site
 * @function envOf
 * @param {Object} [options.strict]
 * @param {string} - name - Name of env
 * @returns {*}
 */
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
