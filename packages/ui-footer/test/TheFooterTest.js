'use strict'
/**
 * Test for TheFooter.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheFooter } = require('../shim/TheFooter')

describe('the-footer', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFooter))
  })
})

/* global describe, before, after, it */
