'use strict'
/**
 * Test for TheCam.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheCam } = require('../shim/TheCam')

describe('the-cam', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCam))
  })
})

/* global describe, before, after, it */
