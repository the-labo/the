/**
 * Get env variables
 * @function envOf
 * @param {string} - name - Name of env
 * @param {Object} [options.strict]
 */
'use strict'

/** @lends envOf */
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
