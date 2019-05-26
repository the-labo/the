'use strict'
/**
 * Test for TheMain.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMain } = require('../shim/TheMain')

describe('the-main', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMain))
  })
})

/* global describe, before, after, it */
