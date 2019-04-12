/**
 * Test for changedProps.
 * Runs with mocha.
 */
'use strict'

const { deepEqual } = require('assert').strict
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
