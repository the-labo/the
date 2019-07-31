'use strict'

/**
 * Test for units.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const units = require('../lib/units')

describe('units', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(units.days(4), 4 * 24 * 60 * 60 * 1000)
    equal(units.hours(4), 4 * 60 * 60 * 1000)
  })
})

/* global describe, before, after, it */
