'use strict'
/**
 * Test for TheListItem.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheListItem = require('../shim/TheListItem').default

describe('the-list-item', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheListItem))
  })
})

/* global describe, before, after, it */
