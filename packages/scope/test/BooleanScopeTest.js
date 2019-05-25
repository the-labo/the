'use strict'
/**
 * Test for BooleanScope.
 * Runs with mocha.
 */
const { equal } = require('assert').strict
const { TheStore } = require('@the-/store')
const BooleanScope = require('../lib/scopes/BooleanScope')

describe('boolean-scope', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const store = new TheStore({})
    const b = store.load(BooleanScope, 'b')

    b.toggle(true)
    equal(b.state, true)
    b.toggle(false)
    equal(b.state, false)
  })
})

/* global describe, before, after, it */
