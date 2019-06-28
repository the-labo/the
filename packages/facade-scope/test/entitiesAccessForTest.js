/**
 * Test for entitiesAccessFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const {
  scopes: { ArrayScope, ScopeScope },
} = require('@the-/scope')
const theStore = require('@the-/store')
const entitiesAccessFor = require('../lib/entitiesAccessFor')

describe('entities-access-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(ArrayScope, 'entities')
    const entitiesAccess = entitiesAccessFor(x)
    ok(Array.isArray(entitiesAccess.state))
    entitiesAccess.add([{ id: 1 }])
    entitiesAccess.addOne({ id: 2 })
    equal(entitiesAccess.state.length, 2)
    entitiesAccess.removeOne({ id: 2 })
    equal(entitiesAccess.state.length, 1)
    entitiesAccess.receiveOne({ id: 4 })
    entitiesAccess.receiveOne({ id: 2 })
    entitiesAccess.receiveOne({ id: 2, name: '222' })
    equal(entitiesAccess.state.length, 3)
    equal(entitiesAccess.state[2].name, '222')
  })
})

/* global describe, before, after, it */
