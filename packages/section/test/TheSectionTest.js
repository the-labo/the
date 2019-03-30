/**
 * Test for TheSection.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheSection = require('../shim/TheSection').default

describe('the-section', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheSection))
  })
})

/* global describe, before, after, it */
