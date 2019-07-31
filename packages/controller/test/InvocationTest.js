'use strict'

/**
 * Test for Invocation.
 * Runs with mocha.
 */
const {
  strict: { equal, ok },
} = require('assert')
const Invocation = require('../lib/Invocation')

describe('invocation', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const invocation = new Invocation({ action: 'foo' })
    ok(invocation.at)
    equal(invocation.action, 'foo')
  })
})

/* global describe, before, after, it */
