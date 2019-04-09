/**
 * Test for TheQr.
 * Runs with mocha.
 */
'use strict'

const TheQr = require('../shim/TheQr').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-qr', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheQr))
  })
})

/* global describe, before, after, it */
