'use strict'
/**
 * Test for get.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const get = require('../lib/get')

describe('get', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(!get('window'))
  })
})

/* global describe, before, after, it */
