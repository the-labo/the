/**
 * Test for TheInputSlider.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInputSlider = require('../shim/TheInputSlider').default

describe('the-input-slider', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputSlider))
  })
})

/* global describe, before, after, it */
