/**
 * Test for TheCondition.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheCondition = require('../shim/TheCondition').default

describe('the-condition', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCondition))
  })
})

/* global describe, before, after, it */
