'use strict'

/**
 * Test for TheVideoStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheVideoStyle } = require('../shim/TheVideoStyle')

describe('the-video-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheVideoStyle))
  })
})

/* global describe, before, after, it */
