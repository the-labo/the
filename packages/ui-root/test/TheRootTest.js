/**
 * Test for TheRoot.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheRoot = require('../shim/TheRoot').default

describe('the-root', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRoot))
  })
})

/* global describe, before, after, it */
