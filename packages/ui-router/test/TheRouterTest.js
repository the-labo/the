/**
 * Test for TheRouter.
 * Runs with mocha.
 */
'use strict'

const TheRouter = require('../shim/TheRouter').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-router', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheRouter))
  })
})

/* global describe, before, after, it */
