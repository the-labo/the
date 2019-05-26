'use strict'
/**
 * Test for isMacOS.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const isMacOS = require('../lib/isMacOS')

describe('is-mac-o-s', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(isMacOS(), isMacOS())
  })
})

/* global describe, before, after, it */
