'use strict'
/**
 * Test for TheToastGroup.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheToastGroup } = require('../shim/TheToastGroup')

describe('the-toast-group', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheToastGroup))
  })
})

/* global describe, before, after, it */
