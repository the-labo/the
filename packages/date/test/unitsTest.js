/**
 * Test for units.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
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
