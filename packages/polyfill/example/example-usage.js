'use strict'

const thePolyfill = require('@the-/polyfill')

async function tryExample () {
  // Apply polyfill
  thePolyfill().apply()
}

tryExample().catch((err) => console.error(err))
