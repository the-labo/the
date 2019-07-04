/**
 * Test for createOperationFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const {
  scopes: { BooleanScope, ObjectScope, ScopeScope, ValueScope },
} = require('@the-/scope')
const theStore = require('@the-/store')
const createOperationFor = require('../lib/operations/createOperationFor')

describe('create-operation-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(ObjectScope, 'entry')
    x.load(BooleanScope, 'busy')
    x.load(ObjectScope, 'entryErrors')
    x.load(ValueScope, 'result')

    const createOperation = createOperationFor(x)
    ok(createOperation)
    createOperation.init()
    createOperation.setEntry({ x: 1 })
    let saved
    await createOperation.exec((entry) => {
      saved = { entry }
      return entry
    })
    equal(saved.entry.x, 1)

    const result = createOperation.getResult()
    equal(result.x, 1)
  })
})

/* global describe, before, after, it */
