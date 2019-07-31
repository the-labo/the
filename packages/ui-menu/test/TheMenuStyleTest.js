'use strict'

/**
 * Test for TheMenuStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMenuStyle } = require('../shim/TheMenuStyle')

describe('the-menu-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMenuStyle))
  })
})

/* global describe, before, after, it */
