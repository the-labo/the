/**
 * Test for TheCamStyle.
 * Runs with mocha.
 */
'use strict'

const TheCamStyle = require('../shim/TheCamStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-cam-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheCamStyle))
  })
})

/* global describe, before, after, it */
