'use strict'
/**
 * Test for get.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const get = require('../lib/get')

describe('get', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(!get('window'))
  })
})

/* global describe, before, after, it */
