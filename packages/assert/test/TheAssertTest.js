'use strict'
/**
 * Test for TheAssert.
 * Runs with mocha.
 */
const {
  strict: { doesNotThrow, ok },
} = require('assert')
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
