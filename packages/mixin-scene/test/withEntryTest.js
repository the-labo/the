'use strict'
/**
 * Test for withEntry.
 * Runs with mocha.
 */
const { deepEqual, ok } = require('assert').strict
const withEntry = require('../lib/withEntry')

describe('with-entry', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const scope = {
      entry: {
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
        state: {},
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
