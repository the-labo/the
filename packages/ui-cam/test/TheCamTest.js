/**
 * Test for TheCam.
 * Runs with mocha.
 */
'use strict'

const TheCam = require('../shim/TheCam').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-cam', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheCam))
  })
})

/* global describe, before, after, it */
