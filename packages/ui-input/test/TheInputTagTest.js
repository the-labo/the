'use strict'
/**
 * Test for TheInputTag.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputTag } = require('../shim/TheInputTag')

describe('the-input-tag', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputTag))
  })
})

/* global describe, before, after, it */
