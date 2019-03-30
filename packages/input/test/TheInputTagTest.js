/**
 * Test for TheInputTag.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInputTag = require('../shim/TheInputTag').default

describe('the-input-tag', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputTag))
  })
})

/* global describe, before, after, it */
