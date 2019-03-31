/**
 * Test for TheButton.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheButton = require('../shim/TheButton').default

describe('the-button', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheButton))
  })
})

/* global describe, before, after, it */
