/**
 * Test for TheVideoStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheVideoStyle = require('../shim/TheVideoStyle').default

describe('the-video-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheVideoStyle))
  })
})

/* global describe, before, after, it */
