'use strict'
/**
 * Test for TheInputRadio.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputRadio } = require('../shim/TheInputRadio')

describe('the-input-radio', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputRadio))
  })
})

/* global describe, before, after, it */
