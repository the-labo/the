/**
 * Test for TheMeta.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheMeta = require('../shim/TheMeta').default

describe('the-meta', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMeta))
  })
})

/* global describe, before, after, it */
