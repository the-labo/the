/**
 * Test for withEntry.
 * Runs with mocha.
 */
'use strict'

const withEntry = require('../lib/withEntry')
const { ok, deepEqual } = require('assert').strict

describe('with-entry', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {

    const scope = {
      entry: {
        set(values) {
          Object.assign(this.state, values)
        },
        get(key) {
          return this.state[key]
        },
        reset(values) {
          this.state = { ...values }
        },
        drop() {
          this.state = {}
        },
        state: {},
      },
      entryErrors: {
        state: {},
      }
    }

    const WithEntry = withEntry(
      class {
        get scope() {
          return scope
        }

        get(name) {
          return scope[name].state
        }
      }
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
