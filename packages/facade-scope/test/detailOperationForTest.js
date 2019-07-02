/**
 * Test for detailOperationFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { deepEqual, equal, ok },
} = require('assert')
const {
  scopes: { BooleanScope, ScopeScope, StringScope, ValueScope },
} = require('@the-/scope')
const theStore = require('@the-/store')
const detailOperationFor = require('../lib/operations/detailOperationFor')

describe('detail-operation-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(BooleanScope, 'busy')
    x.load(BooleanScope, 'ready')
    x.load(ValueScope, 'entity')
    x.load(StringScope, 'id')
    const detailOperation = detailOperationFor(x)
    detailOperation.setId('123')
    equal(detailOperation.getId(), '123')
    await detailOperation.sync((id) => ({ id, name: 'hoge' }))
    deepEqual(detailOperation.getEntity(), { id: '123', name: 'hoge' })
  })
})

/* global describe, before, after, it */
