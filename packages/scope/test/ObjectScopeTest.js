'use strict'
/**
 * Test for ObjectScope.
 * Runs with mocha.
 */
const {
  strict: { deepEqual, equal, ok },
} = require('assert')
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

    const {
      foo: { state: state01 },
    } = store
    store.foo.set('a', 1)
    const {
      foo: { state: state02 },
    } = store
    ok(state01 !== state02)
    store.foo.set('a', 1)
    const {
      foo: { state: state03 },
    } = store
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
