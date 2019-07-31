'use strict'

const { default: thePS } = require('@the-/ps')

async function tryExample() {
  const ps = thePS('var/my-process.pid')

  // Terminate zombie and generate pid file
  await ps.acquire()
}

tryExample().catch((err) => console.error(err))
