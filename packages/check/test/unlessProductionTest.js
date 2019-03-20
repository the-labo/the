/**
 * Test for unlessProduction.
 * Runs with mocha.
 */
'use strict'

const unlessProduction = require('../lib/unlessProduction')

describe('unless-production', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    unlessProduction(() => true)
  })
})

/* global describe, before, after, it */
