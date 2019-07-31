'use strict'

/**
 * Test for TheHtml.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheHtml } = require('../shim/TheHtml')

describe('the-html', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHtml))
  })
})

/* global describe, before, after, it */
