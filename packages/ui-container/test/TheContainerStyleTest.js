/**
 * Test for TheContainerStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheContainerStyle = require('../shim/TheContainerStyle').default

describe('the-container-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheContainerStyle))
  })
})

/* global describe, before, after, it */
