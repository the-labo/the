/**
 * Test for destroyOperationFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const {
  scopes: { BooleanScope, ScopeScope, StringScope, ValueScope },
} = require('@the-/scope')
const theStore = require('@the-/store')
const destroyOperationFor = require('../lib/operations/destroyOperationFor')

describe('destroy-operation-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(BooleanScope, 'busy')
    x.load(ValueScope, 'entity')
    x.load(StringScope, 'id')
    const destroyOperation = destroyOperationFor(x)
    ok(destroyOperation)
    await destroyOperation.sync(async () => null)
    await destroyOperation.exec(async () => {})
  })
})

/* global describe, before, after, it */
