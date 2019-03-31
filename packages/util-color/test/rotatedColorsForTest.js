/**
 * Test for rotatedColorsFor.
 * Runs with mocha.
 */
'use strict'

const rotatedColorsFor = require('../lib/rotatedColorsFor')
const {ok, equal, deepEqual} = require('assert')

describe('rotated-colors-for', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    equal(
      rotatedColorsFor('#381', {count: 3}).length,
      3
    )
  })
})

/* global describe, before, after, it */
