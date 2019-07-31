'use strict'

/**
 * Test for TheFlickStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheFlickStyle } = require('../shim/TheFlickStyle')

describe('the-flick-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFlickStyle))
  })
})

/* global describe, before, after, it */
