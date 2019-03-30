/**
 * Test for TheDemoComponent.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheDemoComponent = require('../shim/TheDemoComponent').default

describe('the-demo-component', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDemoComponent))
  })
})

/* global describe, before, after, it */
