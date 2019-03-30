'use strict'

const { withDebug } = require('@the-/mixin-stream')
const { TheStream } = require('@the-/stream')

async function tryExample() {
  class MyStream extends withDebug(TheStream) {
    /* ... */
  }
}

tryExample().catch((err) => console.error(err))
