'use strict'
/**
 * Test for TheVideo.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheVideo } = require('../shim/TheVideo')

describe('the-video', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheVideo))
  })
})

/* global describe, before, after, it */
