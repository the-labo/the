'use strict'

const {TheStream} = require('the-stream-base')
const {withDebug} = require('@the-/mixin-stream')

async function tryExample () {
  class MyStream extends withDebug(TheStream) {
    /* ... */
  }
}

tryExample().catch((err) => console.error(err))
