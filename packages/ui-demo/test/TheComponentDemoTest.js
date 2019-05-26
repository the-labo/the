'use strict'
/**
 * Test for TheComponentDemo.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheComponentDemo } = require('../shim/TheComponentDemo')

describe('the-component-demo', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheComponentDemo))
  })
})

/* global describe, before, after, it */
