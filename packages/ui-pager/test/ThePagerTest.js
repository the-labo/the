'use strict'
/**
 * Test for ThePager.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: ThePager } = require('../shim/ThePager')

describe('the-pager', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(ThePager))
  })
})

/* global describe, before, after, it */
