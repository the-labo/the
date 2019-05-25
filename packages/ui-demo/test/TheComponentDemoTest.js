'use strict'
/**
 * Test for TheComponentDemo.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheComponentDemo = require('../shim/TheComponentDemo').default

describe('the-component-demo', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheComponentDemo))
  })
})

/* global describe, before, after, it */
