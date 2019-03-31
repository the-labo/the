/**
 * Test for TheListStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheListStyle = require('../shim/TheListStyle').default

describe('the-list-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheListStyle))
  })
})

/* global describe, before, after, it */
