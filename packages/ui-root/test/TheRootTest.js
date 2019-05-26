'use strict'
/**
 * Test for TheRoot.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheRoot } = require('../shim/TheRoot')

describe('the-root', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRoot))
  })
})

/* global describe, before, after, it */
