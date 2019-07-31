'use strict'

/**
 * Test for TheFrameStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheFrameStyle } = require('../shim/TheFrameStyle')

describe('the-frame-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFrameStyle))
  })
})

/* global describe, before, after, it */
