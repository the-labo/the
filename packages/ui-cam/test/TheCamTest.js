/**
 * Test for TheCam.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheCam = require('../shim/TheCam').default

describe('the-cam', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCam))
  })
})

/* global describe, before, after, it */
