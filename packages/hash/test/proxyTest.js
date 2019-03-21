/**
 * Test for proxy.
 * Runs with mocha.
 */
'use strict'

const proxy = require('../lib/proxy')
const { ok, strictEqual: equal, deepStrictEqual: deepEqual } = require('assert')

describe('proxy', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const p = proxy({
      a: 1,
      __proto__: {
        b: 2,
      }
    })
    equal(p.a, 1)
    equal(p.b, 2)

    ok('a' in p)
    ok('b' in p)
    ok(!('c' in p))
  })
})

/* global describe, before, after, it */
