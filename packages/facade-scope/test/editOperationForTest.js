/**
 * Test for editOperationFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const {
  scopes: { BooleanScope, ObjectScope, ScopeScope, StringScope, ValueScope },
} = require('@the-/scope')
const theStore = require('@the-/store')
const editOperationFor = require('../lib/operations/editOperationFor')

describe('edit-operation-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(ValueScope, 'entity')
    x.load(ObjectScope, 'entry')
    x.load(BooleanScope, 'busy')
    x.load(ObjectScope, 'entryErrors')
    x.load(StringScope, 'id')

    const editOperation = editOperationFor(x)
    editOperation.init()
    editOperation.setId(3)
    await editOperation.sync((id) => ({ id }))
    equal(editOperation.entityAccess.state.id, 3)
    editOperation.setEntry({ name: '123' })
    let saved = {}
    await editOperation.exec((id, entry) => {
      saved = { entry, id }
    })
    equal(saved.id, 3)
    equal(saved.entry.name, '123')
  })
})

/* global describe, before, after, it */
