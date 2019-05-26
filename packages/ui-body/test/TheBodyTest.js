'use strict'
/**
 * Test for TheBody.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheBody } = require('../shim/TheBody')

describe('the-body', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheBody))
  })
})

/* global describe, before, after, it */
