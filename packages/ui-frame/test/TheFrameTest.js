'use strict'

/**
 * Test for TheFrame.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheFrame } = require('../shim/TheFrame')

describe('the-frame', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFrame))
  })
})

/* global describe, before, after, it */
