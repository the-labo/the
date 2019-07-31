'use strict'

/**
 * Test for TheSectionStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheSectionStyle } = require('../shim/TheSectionStyle')

describe('the-section-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheSectionStyle))
  })
})

/* global describe, before, after, it */
