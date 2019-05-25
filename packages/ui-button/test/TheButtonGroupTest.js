'use strict'
/**
 * Test for TheButtonGroup.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheButtonGroup = require('../shim/TheButtonGroup').default

describe('the-button-group', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheButtonGroup))
  })
})

/* global describe, before, after, it */
