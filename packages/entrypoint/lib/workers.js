/**
 * Register service workers
 * @function workers
 * @param {string[]} swUrls - Service worker urls
 * @returns {Promise<undefined>}
 */
'use strict'

const { get } = require('@the-/window')

const fullPath = (url) => new URL(url, location.href).href

/** @lends workers */
async function workers(swUrls, options = {}) {
  const { purge = true } = options
  const serviceWorker = get('navigator.serviceWorker')
  if (!serviceWorker) {
    return
  }
  if (Array.isArray(swUrls)) {
    throw new Error('[TheEntrypoint] Passing array is no longer supported!')
  }

  if (purge) {
    const supportedScopes = Object.keys(swUrls).map((scope) => fullPath(scope))
    const supportedScripts = Object.values(swUrls).map((scope) =>
      fullPath(scope),
    )
    const registrations = await serviceWorker.getRegistrations()
    for (const registration of registrations) {
      const { scriptURL } = registration.active || {}
      if (!scriptURL) {
        continue
      }
      const invalidScript = !supportedScripts.includes(scriptURL)
      if (invalidScript) {
        await registration.unregister()
        console.warn(`[TheEntrypoint] Unregister worker with script`, scriptURL)
      }
      const invalidScope = !supportedScopes.includes(registration.scope)
      if (invalidScope) {
        await registration.unregister()
        console.warn(
          `[TheEntrypoint] Unregister worker with scope`,
          registration.scope,
        )
      }
    }
  }

  for (const [scope, url] of Object.entries(swUrls)) {
    await serviceWorker.register(url, { scope })
  }
}

module.exports = workers
