'use strict'

const theHandle = require('the-handle')

async function tryExample() {
  const handle = theHandle({
    /* ... */
  })
}

tryExample().catch((err) => console.error(err))
