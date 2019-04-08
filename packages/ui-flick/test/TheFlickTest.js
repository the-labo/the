/**
 * Test for TheFlick.
 * Runs with mocha.
 */
'use strict'

const TheFlick = require('../shim/TheFlick').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-flick', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheFlick))
  })
})

/* global describe, before, after, it */
