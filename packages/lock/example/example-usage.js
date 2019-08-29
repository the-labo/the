'use strict'

const theLock = require('@the-/lock')

async function tryExample() {
  const key = 'key01'
  await theLock.acquire(key, async () => {
    // DO Something
  })
}

tryExample().catch((err) => console.error(err))
