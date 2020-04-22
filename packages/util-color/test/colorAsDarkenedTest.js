/**
 * @file Test for colorAsDarkened.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const colorAsDarkened = require('../lib/colorAsDarkened')

describe('color-as-darkened', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(colorAsDarkened)
    equal(colorAsDarkened('#FFF'), 'hsl(0, 0%, 69.8%)')
  })
})

/* global describe, before, after, it */
