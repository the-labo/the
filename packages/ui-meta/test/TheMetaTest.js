'use strict'

/**
 * Test for TheMeta.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMeta } = require('../shim/TheMeta')

describe('the-meta', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMeta))
  })
})

/* global describe, before, after, it */
