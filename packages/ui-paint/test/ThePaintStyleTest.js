'use strict'
/**
 * Test for ThePaintStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: ThePaintStyle } = require('../shim/ThePaintStyle')

describe('the-paint-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(ThePaintStyle))
  })
})

/* global describe, before, after, it */
