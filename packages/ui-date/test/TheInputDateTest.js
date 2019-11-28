/**
 * Test for TheInputDate.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputDate } = require('../shim/TheInputDate')

describe('the-input-date', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheInputDate)
    ok(React.createElement(TheInputDate))
  })
})

/* global describe, before, after, it */
