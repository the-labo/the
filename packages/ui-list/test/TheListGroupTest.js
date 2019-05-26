'use strict'
/**
 * Test for TheListGroup.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheListGroup } = require('../shim/TheListGroup')

describe('the-list-group', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheListGroup))
  })
})

/* global describe, before, after, it */
