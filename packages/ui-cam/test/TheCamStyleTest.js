'use strict'
/**
 * Test for TheCamStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheCamStyle } = require('../shim/TheCamStyle')

describe('the-cam-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCamStyle))
  })
})

/* global describe, before, after, it */
