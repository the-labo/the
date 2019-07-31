'use strict'

/**
 * Test for TheListItem.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheListItem } = require('../shim/TheListItem')

describe('the-list-item', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheListItem))
  })
})

/* global describe, before, after, it */
