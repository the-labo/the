/**
 * Test for TheDemoComponent.
 * Runs with mocha.
 */
'use strict'

const TheDemoComponent = require('../shim/TheDemoComponent').default
const React = require('react')
const { ok } = require('assert')

describe('the-demo-component', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    const element = React.createElement(TheDemoComponent)
    ok(element)
  })
})

/* global describe, before, after, it */
