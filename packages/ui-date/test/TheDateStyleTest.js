/**
 * Test for TheDateStyle.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheDateStyle } = require('../shim/TheDateStyle')

describe('the-date-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheDateStyle)
    ok(React.createElement(TheDateStyle))
  })
})

/* global describe, before, after, it */
