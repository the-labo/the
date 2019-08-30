/**
 * Test for countsAccessFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { deepEqual, ok },
} = require('assert')
const {
  scopes: { ScopeScope, ValueScope },
} = require('@the-/scope')
const theStore = require('@the-/store')
const countsAccessFor = require('../lib/countsAccessFor')

describe('counts-access-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(ValueScope, 'counts')

    const countsAccess = countsAccessFor(x)
    countsAccess.increase(1)
    deepEqual(store.x.counts.state, { length: 1, offset: 0, total: 1 })
  })
})

/* global describe, before, after, it */
