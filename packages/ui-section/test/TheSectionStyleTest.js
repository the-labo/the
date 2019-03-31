/**
 * Test for TheSectionStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheSectionStyle = require('../shim/TheSectionStyle').default

describe('the-section-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheSectionStyle))
  })
})

/* global describe, before, after, it */
