/**
 * Test for TheFlick.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheFlick = require('../shim/TheFlick').default

describe('the-flick', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFlick))
  })
})

/* global describe, before, after, it */
