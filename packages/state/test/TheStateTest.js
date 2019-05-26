'use strict'
/**
 * Test for TheState.
 * Runs with mocha.
 */
const {
  strict: { deepEqual, equal, ok },
} = require('assert')
const TheState = require('../lib/TheState')

describe('the-state', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheState)

    const state = new TheState()
    const subscribed = []
    state.subscribe((v) => {
      subscribed.push(v)
    })
    state.set({
      v1: 'This is v1',
    })
    equal(state.get('v1'), 'This is v1')

    {
      const scope01 = state.scope('scope01')
      ok(scope01)
      scope01.set({ v2: 'This is v2' })
      equal(scope01.get('v2'), 'This is v2')
    }

    equal(state.scope('scope01').get('v2'), 'This is v2')

    equal(state.get('scope01').v2, 'This is v2')

    state.scope('scope01').del('v2')
    equal(state.scope('scope01').get('v2'), void 0)

    state.scope('scope02').set({ foo: 'bar' })

    deepEqual(subscribed[0], { v1: 'This is v1' })
    deepEqual(subscribed[1], { scope01: {}, v1: 'This is v1' })
    deepEqual(subscribed[2], {
      scope01: { v2: 'This is v2' },
      v1: 'This is v1',
    })
    deepEqual(subscribed[3], { scope01: {}, v1: 'This is v1' })

    state.scope('scope02').set({ foo: 'bar' })
    state.scope('scope02').set({ foo: 'bar2' })

    deepEqual(subscribed[6], {
      scope01: {},
      scope02: { foo: 'bar2' },
      v1: 'This is v1',
    })

    deepEqual(state.state, {
      scope01: {},
      scope02: { foo: 'bar2' },
      v1: 'This is v1',
    })
  })

  it('Nested scope', () => {
    const state = new TheState()
    const c = state
      .scope('a')
      .scope('b')
      .scope('c')
    c.set({ v1: 1, v2: 2 })
    deepEqual(state.state, {
      a: { b: { c: { v1: 1, v2: 2 } } },
    })
    deepEqual(c.state, { v1: 1, v2: 2 })

    equal(state.scope('a', 'b').state.c.v1, 1)
    equal(state.scope('a.b').state.c.v1, 1)

    deepEqual(state.keys(), ['a'])
    state.drop()
    deepEqual(state.keys(), [])
  })
})

/* global describe, before, after, it */
