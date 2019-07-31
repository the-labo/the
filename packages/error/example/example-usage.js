'use strict'

const { TheNotFoundError } = require('@the-/error')

async function tryExample() {
  throw new TheNotFoundError()
}

tryExample().catch((err) => console.error(err))
