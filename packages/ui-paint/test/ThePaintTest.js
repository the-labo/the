'use strict'
/**
 * Test for ThePaint.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: ThePaint } = require('../shim/ThePaint')

describe('the-paint', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(ThePaint))
  })
})

/* global describe, before, after, it */
