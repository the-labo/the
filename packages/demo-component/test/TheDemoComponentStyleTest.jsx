/**
 * Test for TheDemoComponentStyle.
 * Runs with mocha.
 */
'use strict'

const TheDemoComponentStyle = require('../shim/TheDemoComponentStyle').default
const React = require('react')
const { ok } = require('assert')

describe('the-demo-component-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    const element = React.createElement(TheDemoComponentStyle)
    ok(element)
  })
})

/* global describe, before, after, it */
