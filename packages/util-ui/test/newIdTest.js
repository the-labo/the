'use strict'
/**
 * Test for newId.
 * Runs with mocha.
 */
const {
  strict: { notEqual, ok },
} = require('assert')
const newId = require('../lib/newId')

describe('new-id', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(newId())
    notEqual(newId(), newId())
  })
})

/* global describe, before, after, it */
