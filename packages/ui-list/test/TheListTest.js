'use strict'

/**
 * Test for TheList.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheList } = require('../shim/TheList')

describe('the-list', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheList))
  })
})

/* global describe, before, after, it */
