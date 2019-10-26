/**
 * Test for TheTabContent.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheTabContent } = require('../shim/TheTabContent')

describe('the-tab-content', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheTabContent)
    ok(React.createElement(TheTabContent))
  })
})

/* global describe, before, after, it */
