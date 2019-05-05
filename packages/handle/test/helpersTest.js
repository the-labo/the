/**
 * Test for helpers.
 * Runs with mocha.
 */
'use strict'

const helpers = require('../lib/helpers')
const { deepEqual } = require('assert').strict

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
