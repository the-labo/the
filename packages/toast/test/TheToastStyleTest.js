/**
 * Test for TheToastStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheToastStyle = require('../shim/TheToastStyle').default

describe('the-toast-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheToastStyle))
  })
})

/* global describe, before, after, it */
