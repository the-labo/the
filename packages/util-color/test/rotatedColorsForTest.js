/**
 * Test for rotatedColorsFor.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const rotatedColorsFor = require('../lib/rotatedColorsFor')

describe('rotated-colors-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(rotatedColorsFor('#381', { count: 3 }).length, 3)
  })
})

/* global describe, before, after, it */
