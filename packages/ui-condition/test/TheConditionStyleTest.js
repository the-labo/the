'use strict'

/**
 * Test for TheConditionStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheConditionStyle } = require('../shim/TheConditionStyle')

describe('the-condition-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheConditionStyle))
  })
})

/* global describe, before, after, it */
