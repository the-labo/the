'use strict'
/**
 * Test for TheImageStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheImageStyle } = require('../shim/TheImageStyle')

describe('the-image-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheImageStyle))
  })
})

/* global describe, before, after, it */
