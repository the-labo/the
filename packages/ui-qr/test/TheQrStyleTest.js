'use strict'
/**
 * Test for TheQrStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheQrStyle = require('../shim/TheQrStyle').default

describe('the-qr-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheQrStyle))
  })
})

/* global describe, before, after, it */
