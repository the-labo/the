/**
 * Test for withFilter.
 * Runs with mocha.
 */
'use strict'

const withFilter = require('../lib/withFilter')
const {ok, equal} = require('assert')

describe('with-filter', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const C = withFilter(
      class A {
        constructor () {
          this.values = {}
        }

        init () {
          this.values = {}
        }

        get (key) {
          return this[key]
        }

        set (values) {
          Object.assign(this.values, values)
        }
      }
    )
    ok(C)
    const c = new C()
    c.setFilterByQ('hoge', {and: {x: 1}})
    equal(
      c.values.filter.x,
      1
    )
  })
})

/* global describe, before, after, it */
