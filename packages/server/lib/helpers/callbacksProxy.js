'use strict'

/**
 * Callback proxy
 * @memberof module:@the-/server.helpers
 * @function callbacksProxy
 * @returns {Proxy} Proxy instance
 */
function callbacksProxy(options = {}) {
  const { client, controllerName, onCallback } = options
  return new Proxy(
    {},
    {
      get(target, name) {
        return (...values) => {
          onCallback({
            cid: client.cid,
            controller: controllerName,
            name,
            values,
          })
        }
      },
    },
  )
}

module.exports = callbacksProxy
