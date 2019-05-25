'use strict'
/**
 * Test for TheAssert.
 * Runs with mocha.
 */
const { doesNotThrow, ok } = require('assert').strict
const TheAssert = require('../lib/TheAssert')

describe('the-assert', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheAssert)

    const assert = new TheAssert()
    doesNotThrow(() => assert.notNullish(1))
    doesNotThrow(() => assert.notNullish(0))
    doesNotThrow(() => assert.notNullish(false))
  })
})

/* global describe, before, after, it */
