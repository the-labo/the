/**
 * Test for TheThemeStyle.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheThemeStyle } = require('../shim/TheThemeStyle')

describe('the-theme-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheThemeStyle)
    ok(React.createElement(TheThemeStyle))
  })
})

/* global describe, before, after, it */
