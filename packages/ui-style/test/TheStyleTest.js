/**
 * @file Test for TheStyle.
 * Runs with mocha.
 */
'use strict'

const TheStyle = require('../shim/TheStyle').default
const React = require('react')
const { ok } = require('assert').strict

describe('the-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheStyle)
    ok(React.createElement(TheStyle))
  })
})

/* global describe, before, after, it */
