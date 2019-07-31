'use strict'

const { TheAssert } = require('@the-/assert')

async function tryExample() {
  const assert = new TheAssert('MyApp') //

  function sum(a, b) {
    assert(arguments.length > 0, 'must take two arguments')
    return a + b
  }

  sum() // -> new Error(`[MyApp] must take two arguments`)
}

tryExample().catch((err) => console.error(err))
