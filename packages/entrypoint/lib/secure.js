'use strict'

/**
 * Make sure to be secure
 * @memberof module:@the-/entrypoint
 * @function secure
 * @param {Object} [options={}] - Optional settings
 * @returns {boolean} Redirect triggered
 */
const { get } = require('@the-/window')

/** @lends module:@the-/entrypoint.secure */
function secure(options = {}) {
  const {
    from = 'http:',
    ignore = ['localhost', '127.0.0.1', /^192\.168/],
    to = 'https:',
  } = options
  const location = get('location')
  const shouldSkip = [location.host, location.hostname].some((host) =>
    []
      .concat(ignore)
      .some((ignore) => (ignore.test ? ignore.test(host) : ignore === host)),
  )
  if (shouldSkip) {
    return false
  }
  if (location.protocol === from) {
    console.log(`[the-entrypoint] redirect "${from}" -> "${to}"`)
    location.protocol = to
    return true
  }
  return false
}

module.exports = secure
