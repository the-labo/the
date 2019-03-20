/**
 * Test for get.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const get = require('../lib/get')

describe('get', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(!get('window'))
  })
})

/* global describe, before, after, it */
