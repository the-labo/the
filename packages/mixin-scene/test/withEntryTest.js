'use strict'
/**
 * Test for withEntry.
 * Runs with mocha.
 */
const {
  strict: { deepEqual, ok },
} = require('assert')
const withEntry = require('../lib/withEntry')

describe('with-entry', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const scope = {
      entry: {
        state: {},
        drop() {
          this.state = {}
        },
        get(key) {
          return this.state[key]
        },
        reset(values) {
          this.state = { ...values }
        },
        set(values) {
          Object.assign(this.state, values)
        },
      },
      entryErrors: {
        state: {},
      },
    }

    const WithEntry = withEntry(
      class {
        get scope() {
          return scope
        }

        get(name) {
          return scope[name].state
        }
      },
    )
    const obj = new WithEntry()
    ok(obj)

    obj.setEntry({
      a: [{ i: 1 }, { i: 2 }],
    })

    obj.setEntry({
      a: [{ i: 1 }],
    })

    deepEqual(obj.getEntry().a, [{ i: 1 }])
  })
})

/* global describe, before, after, it */
