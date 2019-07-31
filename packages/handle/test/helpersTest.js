'use strict'

/**
 * Test for helpers.
 * Runs with mocha.
 */
const {
  strict: { deepEqual },
} = require('assert')
const helpers = require('../lib/helpers')

describe('helpers', () => {
  before(() => {})

  after(() => {})

  it('allMethodNames', () => {
    class C1 {
      a() {
        return 'a'
      }
    }

    class C2 extends C1 {
      b() {
        return 'b'
      }
    }

    const c2 = new C2()
    const methodNames = helpers.allMethodNames(c2)
    deepEqual(methodNames, ['a', 'b'])
  })
})

/* global describe, before, after, it */
