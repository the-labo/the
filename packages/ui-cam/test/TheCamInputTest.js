/**
 * Test for TheCamInput.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheCamInput = require('../shim/TheCamInput').default

describe('the-cam-input', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCamInput))
  })
})

/* global describe, before, after, it */
