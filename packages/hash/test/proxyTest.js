'use strict'

/**
 * Test for proxy.
 * Runs with mocha.
 */
const { ok, strictEqual: equal } = require('assert')
const proxy = require('../lib/proxy')

describe('proxy', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const p = proxy({
      __proto__: {
        b: 2,
      },
      a: 1,
    })
    equal(p.a, 1)
    equal(p.b, 2)

    ok('a' in p)
    ok('b' in p)
    ok(!('c' in p))
  })
})

/* global describe, before, after, it */
