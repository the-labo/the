'use strict'
/**
 * Test for TheIcon.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheIcon } = require('../shim/TheIcon')

describe('the-icon', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheIcon))
  })
})

/* global describe, before, after, it */
