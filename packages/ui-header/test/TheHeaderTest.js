/**
 * Test for TheHeader.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheHeader = require('../shim/TheHeader').default

describe('the-header', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHeader))
  })
})

/* global describe, before, after, it */
