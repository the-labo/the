/**
 * Test for TheIcon.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheIcon = require('../shim/TheIcon').default

describe('the-icon', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheIcon))
  })
})

/* global describe, before, after, it */
