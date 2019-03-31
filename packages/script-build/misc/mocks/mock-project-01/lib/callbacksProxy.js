/**
 * Callback proxy
 * @function callbacksProxy
 * @returns {Proxy} Proxy instance
 */
'use strict'

/** @lends callbacksProxy */
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

export default callbacksProxy
