/**
 * Test for NullScope.
 * Runs with mocha.
 */
'use strict'

const { TheStore } = require('@the-/store')
const NullScope = require('../lib/scopes/NullScope')
const { ok, equal } = require('assert')

describe('null-scope', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const store = new TheStore({})
    const n = store.load(NullScope, 'n')

    equal(n.state, null)
  })
})

/* global describe, before, after, it */
