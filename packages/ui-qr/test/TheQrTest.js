/**
 * Test for TheQr.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheQr = require('../shim/TheQr').default

describe('the-qr', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheQr))
  })
})

/* global describe, before, after, it */
