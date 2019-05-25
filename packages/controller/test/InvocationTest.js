'use strict'
/**
 * Test for Invocation.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
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
