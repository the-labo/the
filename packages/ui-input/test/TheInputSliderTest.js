'use strict'

/**
 * Test for TheInputSlider.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputSlider } = require('../shim/TheInputSlider')

describe('the-input-slider', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputSlider))
  })
})

/* global describe, before, after, it */
