'use strict'

/**
 * Test for TheImage.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheImage } = require('../shim/TheImage')

describe('the-image', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheImage))
  })
})

/* global describe, before, after, it */
