/**
 * Test for withLimit.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert')
const withLimit = require('../lib/withLimit')

describe('with-limit', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const WithLimit = withLimit(
      class {
        get(key) {
          return this[key]
        }

        set(values) {
          Object.assign(this, values)
        }
      },
    )

    const instance = new WithLimit()
    instance.setLimit(10)
    equal(instance.getLimit(), 10)
    instance.updateToNextLimit()
    instance.updateToNextLimit()
    equal(instance.getLimit(), 40)
  })
})

/* global describe, before, after, it */
