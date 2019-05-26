'use strict'
/**
 * Test for TheInfo.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInfo } = require('../shim/TheInfo')

describe('the-info', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInfo))
  })
})

/* global describe, before, after, it */
