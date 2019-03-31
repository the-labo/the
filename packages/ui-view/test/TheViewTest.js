/**
 * Test for TheView.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheView = require('../shim/TheView').default

describe('the-view', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheView))
  })
})

/* global describe, before, after, it */
