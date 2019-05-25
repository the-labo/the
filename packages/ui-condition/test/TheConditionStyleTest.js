'use strict'
/**
 * Test for TheConditionStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheConditionStyle = require('../shim/TheConditionStyle').default

describe('the-condition-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheConditionStyle))
  })
})

/* global describe, before, after, it */
