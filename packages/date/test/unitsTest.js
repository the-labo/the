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
    equal(units.days(4), 345600000)
    equal(units.hours(4), 14400000)
  })
})

/* global describe, before, after, it */
