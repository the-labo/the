'use strict'
/**
 * Test for unlessProduction.
 * Runs with mocha.
 */
const unlessProduction = require('../lib/unlessProduction')

describe('unless-production', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    unlessProduction(() => true)
  })
})

/* global describe, before, after, it */
