/**
 * Test for colorAlpha.
 * Runs with mocha.
 */
'use strict'

const colorAlpha = require('../lib/colorAlpha'
const { ok, equal } = require('assert'

describe('color-alpha', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    equal(colorAlpha('#38A', 0.2), 'rgba(51, 136, 170, 0.2)')
  })
})

/* global describe, before, after, it */
