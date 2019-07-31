'use strict'

/**
 * Test for TheCamInput.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheCamInput } = require('../shim/TheCamInput')

describe('the-cam-input', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCamInput))
  })
})

/* global describe, before, after, it */
