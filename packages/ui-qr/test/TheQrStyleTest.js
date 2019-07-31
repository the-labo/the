'use strict'

/**
 * Test for TheQrStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheQrStyle } = require('../shim/TheQrStyle')

describe('the-qr-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheQrStyle))
  })
})

/* global describe, before, after, it */
