/**
 * Fetch with cache
 * @function cachedFetch
 * @param {Cache} cache
 * @param {Request} request
 */
'use strict'

const { unlessProduction } = require('the-check')

/** @lends cachingFetch */
async function cachingFetch(cache, request) {
  const cached = cache && (await cache.match(request))
  if (cached && cached.ok) {
    unlessProduction(() => {
      console.log(`[cachingFetch] Using cache:`, request.url)
    })
    return cached
  }
  const fetched = await fetch(request)
  if (!fetched.ok) {
    try {
      await cache.delete(request)
    } catch (e) {
      console.warn(`[cachingFetch] Failed to delete cache`, e.message || e)
    }
    return fetched
  }
  try {
    await cache.put(request, fetched.clone())
  } catch (e) {
    console.warn(`[cachingFetch] Failed to put cache`, e.message || e)
  }
  return fetched
}

module.exports = cachingFetch
