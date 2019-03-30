/**
 * Test for TheLink.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheLink = require('../shim/TheLink').default

describe('the-link', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheLink))
  })
})

/* global describe, before, after, it */
