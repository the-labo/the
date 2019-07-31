'use strict'

/**
 * Test for TheCondition.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheCondition } = require('../shim/TheCondition')

describe('the-condition', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCondition))
  })
})

/* global describe, before, after, it */
