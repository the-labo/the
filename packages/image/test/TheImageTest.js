/**
 * Test for TheImage.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheImage = require('../shim/TheImage').default

describe('the-image', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheImage))
  })
})

/* global describe, before, after, it */
