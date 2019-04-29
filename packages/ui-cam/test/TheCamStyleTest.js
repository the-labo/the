/**
 * Test for TheCamStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheCamStyle = require('../shim/TheCamStyle').default

describe('the-cam-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCamStyle))
  })
})

/* global describe, before, after, it */
