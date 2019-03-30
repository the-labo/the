/**
 * Test for bindScope.
 * Runs with mocha.
 */
'use strict'

const bindScope = require('../lib/bindScope')
const {ok, equal} = require('assert')

describe('bindScope', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const Bound = bindScope('foo.bar')(
      class {
        get store () {
          return {
            foo: {
              bar: {m: 'This is bar'}
            }
          }
        }
      }
    )
    const bound = new Bound()
    equal(bound.scope.m, 'This is bar')
  })
})

/* global describe, before, after, it */
