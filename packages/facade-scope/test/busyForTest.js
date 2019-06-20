/**
 * Test for busyFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const {
  scopes: { BooleanScope, ScopeScope },
} = require('@the-/scope')
const { TheStore } = require('@the-/store')
const busyFor = require('../lib/busyFor')

describe('busy-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const store = new TheStore({})
    const a = store.load(ScopeScope, 'a')
    a.load(BooleanScope, 'busy')

    const busy = busyFor(a)
    ok(busy)
    await busy.while(() => {
      equal(a.busy.state, true)
    })
    equal(a.busy.state, false)
    busy.false()
    equal(busy.state, a.busy.state)
    busy.true()
  })
})

/* global describe, before, after, it */
