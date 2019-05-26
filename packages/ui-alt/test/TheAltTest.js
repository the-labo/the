'use strict'
/**
 * Test for TheAlt.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheAlt } = require('../shim/TheAlt')

describe('the-alt', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheAlt))
  })
})

/* global describe, before, after, it */
