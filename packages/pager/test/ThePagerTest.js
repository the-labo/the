/**
 * Test for ThePager.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const ThePager = require('../shim/ThePager').default

describe('the-pager', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(ThePager))
  })
})

/* global describe, before, after, it */
