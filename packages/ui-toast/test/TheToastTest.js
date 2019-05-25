'use strict'
/**
 * Test for TheToast.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheToast = require('../shim/TheToast').default

describe('the-toast', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheToast))
  })
})

/* global describe, before, after, it */
