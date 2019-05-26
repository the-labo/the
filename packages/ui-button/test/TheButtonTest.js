'use strict'
/**
 * Test for TheButton.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheButton } = require('../shim/TheButton')

describe('the-button', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheButton))
  })
})

/* global describe, before, after, it */
