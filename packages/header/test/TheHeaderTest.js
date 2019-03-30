/**
 * Test for TheHeader.
 * Runs with mocha.
 */
'use strict'

const TheHeader = require('../shim/TheHeader').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-header', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheHeader))
  })
})

/* global describe, before, after, it */
