/**
 * Test for TheInputRadio.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInputRadio = require('../shim/TheInputRadio').default

describe('the-input-radio', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputRadio))
  })
})

/* global describe, before, after, it */
