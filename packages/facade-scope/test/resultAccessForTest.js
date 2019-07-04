/**
 * Test for resultAccessFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const {
  scopes: { ScopeScope, ValueScope },
} = require('@the-/scope')
const theStore = require('@the-/store')
const resultAccessFor = require('../lib/resultAccessFor')

describe('result-access-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(ValueScope, 'result')

    const resultAccess = resultAccessFor(x)
    await resultAccess.save(async () => ({ name: 'hoo' }))
    equal(resultAccess.state.name, 'hoo')
  })
})

/* global describe, before, after, it */
