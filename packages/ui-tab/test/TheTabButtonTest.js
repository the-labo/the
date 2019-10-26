/**
 * Test for TheTabButton.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheTabButton } = require('../shim/TheTabButton')

describe('the-tab-button', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheTabButton)
    ok(React.createElement(TheTabButton))
  })
})

/* global describe, before, after, it */
