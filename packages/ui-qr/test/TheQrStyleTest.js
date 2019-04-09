/**
 * Test for TheQrStyle.
 * Runs with mocha.
 */
'use strict'

const TheQrStyle = require('../shim/TheQrStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-qr-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheQrStyle))
  })
})

/* global describe, before, after, it */
