/**
 * Test for TheDemoUiStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheDemoUiStyle = require('../shim/TheDemoUiStyle').default

describe('the-demo-ui-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDemoUiStyle))
  })
})

/* global describe, before, after, it */
