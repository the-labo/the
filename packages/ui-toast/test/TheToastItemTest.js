/**
 * @file Test for TheToastItem.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheToastItem } = require('../shim/TheToastItem')

describe('the-toast-item', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheToastItem)
    ok(React.createElement(TheToastItem))
  })
})

/* global describe, before, after, it */
