/**
 * Test for isProduction.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const isProduction = require('../lib/isProduction')

describe('is-production', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(isProduction(), isProduction())
  })
})

/* global describe, before, after, it */
