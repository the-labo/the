/**
 * @file Test for TheStyle.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheStyle } = require('../shim/TheStyle')

describe('the-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheStyle)
    ok(React.createElement(TheStyle))
  })
})

/* global describe, before, after, it */
