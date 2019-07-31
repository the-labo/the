'use strict'

/**
 * Test for getAllPropertyDescriptors.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const getAllPropertyDescriptors = require('../lib/helpers/getAllPropertyDescriptors')

describe('get-all-property-descriptors', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
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
    const desc = getAllPropertyDescriptors(c2)
    ok(desc.a)
    ok(desc.b)
  })
})

/* global describe, before, after, it */
