/**
 * Test for TheMeta.
 * Runs with mocha.
 */
'use strict'

const TheMeta = require('../shim/TheMeta').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-meta', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheMeta))
  })
})

/* global describe, before, after, it */
