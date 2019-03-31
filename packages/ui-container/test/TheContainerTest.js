/**
 * Test for TheContainer.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheContainer = require('../shim/TheContainer').default

describe('the-container', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheContainer))
  })
})

/* global describe, before, after, it */
