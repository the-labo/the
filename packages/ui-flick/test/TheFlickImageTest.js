'use strict'
/**
 * Test for TheFlickImage.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheFlickImage = require('../shim/TheFlickImage')

describe('the-flick-image', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    ok(React.createElement(TheFlickImage, {}))
  })
})

/* global describe, before, after, it */
