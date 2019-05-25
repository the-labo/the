'use strict'
/**
 * Test for bindScope.
 * Runs with mocha.
 */
const { equal } = require('assert').strict
const bindScope = require('../lib/bindScope')

describe('bindScope', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const Bound = bindScope('foo.bar')(
      class {
        get store() {
          return {
            foo: {
              bar: { m: 'This is bar' },
            },
          }
        }
      },
    )
    const bound = new Bound()
    equal(bound.scope.m, 'This is bar')
  })
})

/* global describe, before, after, it */
