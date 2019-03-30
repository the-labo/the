/**
 * Test for TheInfo.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInfo = require('../shim/TheInfo').default

describe('the-info', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInfo))
  })
})

/* global describe, before, after, it */
