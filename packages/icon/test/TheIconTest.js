/**
 * Test for TheIcon.
 * Runs with mocha.
 */
'use strict'

const TheIcon = require('../shim/TheIcon').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-icon', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheIcon))
  })
})

/* global describe, before, after, it */
