/**
 * Callback proxy
 * @memberOf module:@the-/server.helpers
 * @function callbacksProxy
 * @returns {Proxy} Proxy instance
 */
'use strict'

/** @lends module:@the-/server.helpers.callbacksProxy */
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
