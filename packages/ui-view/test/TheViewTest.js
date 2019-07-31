'use strict'

/**
 * Test for TheView.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheView } = require('../shim/TheView')

describe('the-view', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheView))
  })
})

/* global describe, before, after, it */
