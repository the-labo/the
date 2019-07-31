'use strict'

/**
 * Test for ArrayScope.
 * Runs with mocha.
 */
const {
  strict: { deepEqual },
} = require('assert')
const { TheStore } = require('@the-/store')
const ArrayScope = require('../lib/scopes/ArrayScope')

describe('array-scope', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const store = new TheStore({})
    store.load(ArrayScope, 'a')

    const { a } = store

    a.push('foo')
    a.push('bar')
    a.pop()
    a.unshift('a')
    a.shift()
    a.unshift('hoge')
    a.push('baz')

    deepEqual(a.state, ['hoge', 'foo', 'baz'])

    a.set(1, 'hoge')
    a.set(2, 'quz')
    a.set(3, 'quzz')
    deepEqual(a.state, ['hoge', 'hoge', 'quz', 'quzz'])

    a.reset(['a1', 'b1'])
    deepEqual(a.state, ['a1', 'b1'])

    a.set(['a1', 'c2'])
    deepEqual(a.state, ['a1', 'c2'])

    a.init()
    deepEqual(a.state, [])
  })
})

/* global describe, before, after, it */
