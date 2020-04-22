/**
 * @file Test for colorAsDarkened.
 * Runs with mocha.
 */
'use strict'

const colorAsDarkened = require('../lib/colorAsDarkened')

const { ok, equal, deepEqual } = require('assert').strict

describe('color-as-darkened', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    ok(colorAsDarkened)
    equal(
      colorAsDarkened('#FFF'),
      'hsl(0, 0%, 69.8%)'
    )
  })
})

/* global describe, before, after, it */
