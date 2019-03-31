/**
 * Test for TheDemoComponentStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheDemoComponentStyle = require('../shim/TheDemoComponentStyle').default

describe('the-demo-component-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDemoComponentStyle))
  })
})

/* global describe, before, after, it */
