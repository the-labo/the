'use strict'
/**
 * Test for withFilter.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const withFilter = require('../lib/withFilter')

describe('with-filter', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const C = withFilter(
      class A {
        constructor() {
          this.values = {}
        }

        get(key) {
          return this[key]
        }

        init() {
          this.values = {}
        }

        set(values) {
          Object.assign(this.values, values)
        }
      },
    )
    ok(C)
    const c = new C()
    c.setFilterByQ('hoge', { and: { x: 1 } })
    equal(c.values.filter.x, 1)
  })
})

/* global describe, before, after, it */
