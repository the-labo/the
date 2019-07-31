'use strict'

const { withDebug } = require('@the-/mixin-stream')
const { TheStream } = require('@the-/stream')

async function tryExample() {
  class MyStream extends withDebug(TheStream) {
    /* ... */
    doSomething() {
      /* ... */
    }
  }

  const stream = new MyStream()
  await stream.doSomething()
}

tryExample().catch((err) => console.error(err))
