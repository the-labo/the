'use strict'

/**
 * Test for TheButtonGroup.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheButtonGroup } = require('../shim/TheButtonGroup')

describe('the-button-group', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheButtonGroup))
  })
})

/* global describe, before, after, it */
