'use strict'

const { addUrlQuery } = require('@the-/url')
const { get } = require('@the-/window')

/**
 * Inject queries on location change
 * @memberof module:@the-/entrypoint
 * @function quelize
 * @param {function()|Object} values or its builder
 * @returns {*}
 */
function quelize(values, options = {}) {
  const { history = get('window.history') } = options
  if (history.$theQuelize) {
    throw new Error('[the-entrypoint][quelize] Quelize already applied!')
  }

  const transform = (url) => {
    const query = typeof values === 'function' ? values() : values
    return addUrlQuery(url, query)
  }
  const { pushState, replaceState } = history

  Object.assign(history, {
    $theQuelize: true,
    pushState: function pushState$theQuelize(state, title, url) {
      return pushState.call(this, state, title, transform(url))
    },
    replaceState: function replaceState$theQuelize(state, title, url) {
      return replaceState.call(this, state, title, transform(url))
    },
  })
}

module.exports = quelize
