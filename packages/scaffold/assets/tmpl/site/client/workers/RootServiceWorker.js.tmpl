/**
 * @file ServiceWorker
 */
'use strict'

import { SrcSets, Urls } from '@self/conf'
import { appCache, cachingFetch, parseUrl } from '@the-/util-sw'

const pathnamesToCache = [
  ...SrcSets.jsSet,
  ...SrcSets.cssSet,
  Urls.ICON_URL,
  /^\/webfonts\//,
  /^\/images\//,
  /\.chunk\.js/,
]

self.addEventListener('install', () => {})

self.addEventListener('fetch', (event) => {
  const requestURL = parseUrl(event.request.url)
  const scriptURL = parseUrl(self.registration.active.scriptURL)
  const isOwn = requestURL.host === scriptURL.host
  const shouldCache =
    isOwn &&
    pathnamesToCache.some((pathname) => !!requestURL.pathname.match(pathname))
  if (!shouldCache) {
    return
  }

  event.respondWith(
    (async function() {
      const { v } = scriptURL.query
      const cache = await appCache(scriptURL.host, v, {
        scope: 'static-files',
      })
      return cachingFetch(cache, event.request)
    })(),
  )
})
