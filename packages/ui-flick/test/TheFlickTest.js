'use strict'
/**
 * Test for TheFlick.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheFlick } = require('../shim/TheFlick')

describe('the-flick', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFlick))
  })
})

/* global describe, before, after, it */
