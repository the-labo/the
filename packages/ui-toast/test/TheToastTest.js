'use strict'

/**
 * Test for TheToast.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheToast } = require('../shim/TheToast')

describe('the-toast', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheToast))
  })
})

/* global describe, before, after, it */
