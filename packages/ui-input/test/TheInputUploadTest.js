'use strict'

/**
 * Test for TheInputUpload.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputUpload } = require('../shim/TheInputUpload')

describe('the-input-upload', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputUpload))
  })
})

/* global describe, before, after, it */
