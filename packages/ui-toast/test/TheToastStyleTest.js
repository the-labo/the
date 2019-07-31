'use strict'

/**
 * Test for TheToastStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheToastStyle } = require('../shim/TheToastStyle')

describe('the-toast-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheToastStyle))
  })
})

/* global describe, before, after, it */
