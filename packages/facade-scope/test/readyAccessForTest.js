/**
 * Test for readyAccessFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const {
  scopes: { BooleanScope, ScopeScope },
} = require('@the-/scope')
const theStore = require('@the-/store')
const readyAccessFor = require('../lib/readyAccessFor')

describe('ready-access-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(BooleanScope, 'ready')
    const readyAccess = readyAccessFor(x)
    ok(readyAccess)
    readyAccess.true()
    equal(readyAccess.state, true)
    readyAccess.false()
    equal(readyAccess.state, false)
  })
})

/* global describe, before, after, it */
