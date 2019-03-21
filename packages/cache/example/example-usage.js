'use strict'

const theCache = require('@the-/cache')

async function tryExample() {
  const cache = theCache({
    max: 10000,
    maxAge: 1000 * 60 * 60,
  })

  cache.set('foo', 'bar')
  const foo = cache.get('foo')
  console.log(foo) // -> 'bar'
  cache.reset() // remove all
}

tryExample().catch((err) => console.error(err))
