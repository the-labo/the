'use strict'

/**
 * Test for TheMenu.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMenu } = require('../shim/TheMenu')

describe('the-menu', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMenu))
  })
})

/* global describe, before, after, it */
