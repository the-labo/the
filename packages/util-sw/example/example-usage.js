'use strict'

const {appCache, cachingFetch} = require('the-sw-util')

async function tryExample () {

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      async function () {
        const cache = await appCache('my-site', 'v1.0.0')
        return cachingFetch(cache, event.request)
      }()
    )
  })

}

tryExample().catch((err) => console.error(err))
