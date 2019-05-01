/**
 * Get app cache from WorkerGlobalScope
 * @function appCache
 * @param {string} name - Name of app
 * @param {string} [version='unknown'] - Version of app
 * @param {Object} [options={}]
 */
'use strict'

const { unlessProduction } = require('@the-/check')

const SCOPE_SEPARATOR = '/'
const VERSION_SEPARATOR = '@'

/** @lends appCache */
async function appCache(name, version = 'unknown', options = {}) {
  const { scope = null } = options
  if (typeof caches === 'undefined') {
    return null
  }
  const cacheNamesToDelete = await appCache.ofAnotherVersions(name, version, {
    scope,
  })
  for (const cacheName of cacheNamesToDelete) {
    await caches.delete(cacheName)
    unlessProduction(() => {
      console.warn(`[appCache] Old cache deleted: ${cacheName}`)
    })
  }
  const cacheName = [[name, version].join(VERSION_SEPARATOR), scope]
    .filter(Boolean)
    .join(SCOPE_SEPARATOR)
  try {
    return caches.open(cacheName)
  } catch (e) {
    console.warn(`[appCache] Failed to open cache: ${e}`)
    await caches.delete(cacheName)
    return null
  }
}

appCache.ofAnotherVersions = async (
  name,
  version = 'unknown',
  options = {},
) => {
  const { scope = null } = options
  const result = []
  for (const cacheName of await caches.keys()) {
    const [n, vs] = cacheName.split(VERSION_SEPARATOR)
    const [v, sc] = (vs && vs.split(SCOPE_SEPARATOR)) || []
    if (n !== name) {
      continue
    }
    const otherScope = !!scope && scope !== sc
    if (otherScope) {
      continue
    }
    const anotherVersion = version !== v
    if (anotherVersion) {
      result.push(cacheName)
    }
  }
  return result
}

module.exports = appCache

/* global caches */
