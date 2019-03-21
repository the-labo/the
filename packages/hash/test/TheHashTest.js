/**
 * Test for TheHash.
 * Runs with mocha.
 */
'use strict'

const TheHash = require('../lib/TheHash')
const { ok, equal, deepEqual } = require('assert')

describe('the-hash', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(TheHash)

    const h = new TheHash()
    h.a = 1
    ok(h.has('a'))
    equal(h.get('a'), 1)

    ok('a' in h)
    deepEqual(Object.keys(h), ['a'])

    const p = h.toProxy()
    equal(p['a'], 1)

    p.set({ x: 1, y: 2 })
    p.n = 3
    equal(p.x, 1)
    equal(p.n, 3)
    equal(h.n, 3)

    for (const [k, v] of Object.entries(p)) {
      // console.log(k, v)
    }

    const sy1 = Symbol('hoge')
    const sy2 = Symbol('hoge2')
    p[sy1] = 'This is sy1'
    equal(p[sy1], 'This is sy1')
    ok(!p[sy2])
    ok(!p[Symbol.toStringTag])
  })

  it('Proxy', () => {
    const x = {
      a: 1,
      __proto__: {
        b: 2,
      }
    }
    equal(x.a, 1)
    equal(x.b, 2)
    ok('b' in x)

    const xProxy = new TheHash(x).toProxy()
    equal(xProxy.a, 1)
  })
})

/* global describe, before, after, it */
