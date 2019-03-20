/**
 * @file ServiceWorker
 */
'use strict'

import conf from './deps/conf'
import { parse as parseUrl } from 'url'
import AppConsts from '../constants/AppConsts'
import { appCache, cachingFetch } from 'the-sw-util'

const { SrcSets, Urls } = conf

const pathsToCache = [
  ...SrcSets.jsSet,
  ...SrcSets.cssSet,
  Urls.ICON_URL,
]
const urlsToCache = []

const patternsToCache = [
  /^\/webfonts\//,
  /^\/images\//,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    async function () {
    }()
  )
})

self.addEventListener('fetch', (event) => {
  const { url } = event.request
  const { pathname, host } = parseUrl(url)
  const isOwn = host === location.host
  const shouldCache = urlsToCache.includes(url) ||
    (isOwn && pathsToCache.includes(pathname) || patternsToCache.some((pattern) => pattern.test(pathname)))
  if (!shouldCache) {
    return
  }

  event.respondWith(
    async function () {
      const cache = await appCache(AppConsts.name, AppConsts.version, {
        scope: 'static-files',
      })
      return cachingFetch(cache, event.request)
    }()
  )
})
