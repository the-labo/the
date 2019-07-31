'use strict'

/**
 * Test case for index.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const lib = require('../shim')

describe('index', () => {
  before(() => {})

  after(() => {})

  it('Exports components', () => {
    const names = Object.keys(lib)
    ok(names.length > 0)
    for (const name of names) {
      ok(lib[name], `${name} should exists`)
    }
  })
})

/* global describe, before, after, it */
