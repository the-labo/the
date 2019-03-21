/**
 * Test for ObjectScope.
 * Runs with mocha.
 */
'use strict'

const { deepEqual, equal, ok } = require('assert').strict
const { TheStore } = require('@the-/store')
const ObjectScope = require('../lib/scopes/ObjectScope')

describe('object-scope', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    class FooScope extends ObjectScope {}

    const store = new TheStore({})

    store.load(FooScope, 'foo')

    deepEqual(store.foo.state, {})

    let state01 = store.foo.state
    store.foo.set('a', 1)
    let state02 = store.foo.state
    ok(state01 !== state02)
    store.foo.set('a', 1)
    let state03 = store.foo.state
    ok(state02 === state03)
    store.foo.set('b', 2)
    ok(store.foo.has('b'))
    equal(store.foo.get('b'), 2)
    store.foo.set({ c: 3 })
    store.foo.del('b')

    deepEqual(store.foo.state, { a: 1, c: 3 })

    store.foo.reset({ x: 1, y: 2 })
    deepEqual(store.foo.state, { x: 1, y: 2 })
    store.foo.drop()

    deepEqual(store.foo.state, {})
  })
})

/* global describe, before, after, it */
