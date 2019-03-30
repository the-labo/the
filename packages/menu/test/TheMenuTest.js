/**
 * Test for TheMenu.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheMenu = require('../shim/TheMenu').default

describe('the-menu', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMenu))
  })
})

/* global describe, before, after, it */
