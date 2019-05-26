'use strict'
/**
 * Test for changedProps.
 * Runs with mocha.
 */
const {
  strict: { deepEqual },
} = require('assert')
const changedProps = require('../lib/changedProps')
describe('changed-props', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    deepEqual(changedProps({ a: 'a0', b: 'b1' }, { a: 'a1', b: 'b1' }), {
      a: 'a1',
    })
  })
})

/* global describe, before, after, it */
