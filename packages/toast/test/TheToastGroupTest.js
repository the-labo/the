/**
 * Test for TheToastGroup.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheToastGroup = require('../shim/TheToastGroup').default

describe('the-toast-group', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheToastGroup))
  })
})

/* global describe, before, after, it */
