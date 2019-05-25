'use strict'
const theHandle = require('@the-/handle')

async function tryExample() {
  const handle = theHandle({
    /* ... */
  })
  handle.setAttribute({
    context: {
      /* ... */
    },
  })
}

tryExample().catch((err) => console.error(err))
