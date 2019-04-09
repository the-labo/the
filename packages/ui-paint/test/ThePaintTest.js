/**
 * Test for ThePaint.
 * Runs with mocha.
 */
'use strict'

const ThePaint = require('../shim/ThePaint').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-paint', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(ThePaint))
  })
})

/* global describe, before, after, it */
