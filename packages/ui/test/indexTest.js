/**
 * Test case for index.
 * Runs with mocha.
 */
'use strict'

const lib = require('../shim')
const {ok} = require('assert')

describe('index', () => {
  before(() => {
  })

  after(() => {
  })

  it('Exports components', () => {
    let names = Object.keys(lib)
    ok(names.length > 0)
    for (let name of names) {
      ok(lib[name], `${name} should exists`)
    }
  })
})

/* global describe, before, after, it */
