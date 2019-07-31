'use strict'

/**
 * Test for TheQr.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheQr } = require('../shim/TheQr')

describe('the-qr', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheQr))
  })
})

/* global describe, before, after, it */
