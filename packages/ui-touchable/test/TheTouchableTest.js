'use strict'

/**
 * Test for TheTouchable.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheTouchable } = require('../shim/TheTouchable')

describe('the-alt', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheTouchable))
  })
})

/* global describe, before, after, it */
