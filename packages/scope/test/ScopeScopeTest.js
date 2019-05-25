'use strict'
/**
 * Test for ScopeScope.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const { TheStore } = require('@the-/store')
const NumberScope = require('../lib/scopes/NumberScope')
const ScopeScope = require('../lib/scopes/ScopeScope')

describe('scope-scope', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const store = new TheStore({})

    const s = store.load(ScopeScope, 's')
    store.load(NumberScope, 's', 'n')
    store.load(NumberScope, 's', 'm')

    s.set({ n: 2 })
    s.set({ m: 3 })

    ok(s.has('n'))
    ok(s.has('m'))
    ok(!s.has('j'))

    equal(store.s.n.state, 2)
    equal(store.s.get('n'), 2)

    s.init()

    equal(store.s.n.state, 0)
    equal(store.s.m.state, 0)

    s.set({ n: 2 })
    s.set({ m: 3 })

    s.init('n')

    equal(store.s.n.state, 0)
    equal(store.s.m.state, 3)
    s.get('m', 3)

    s.init('m')

    equal(store.s.m.state, 0)
  })
})

/* global describe, before, after, it */
