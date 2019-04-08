/**
 * Test for TheCamInput.
 * Runs with mocha.
 */
'use strict'

const TheCamInput = require('../shim/TheCamInput').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-cam-input', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheCamInput))
  })
})

/* global describe, before, after, it */
