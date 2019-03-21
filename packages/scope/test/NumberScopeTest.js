/**
 * Test for NumberScope.
 * Runs with mocha.
 */
'use strict'

const {TheStore} = require('@the-/store')
const NumberScope = require('../lib/scopes/NumberScope')
const {ok, equal, deepEqual} = require('assert')

describe('number-scope', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const store = new TheStore({})
    store.load(NumberScope, 'n')

    const {n} = store

    ok(n.isZero())

    equal(n.state, 0)
    n.increment(2)
    equal(n.state, 2)
    ok(n.isPositive())
    ok(!n.isZero())
    ok(!n.isNegative())

    n.set(100)
    equal(n.state, 100)

    n.init()

    equal(n.state, 0)
  })
})

/* global describe, before, after, it */
