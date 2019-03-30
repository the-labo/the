/**
 * Test for TheListGroup.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheListGroup = require('../shim/TheListGroup').default

describe('the-list-group', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheListGroup))
  })
})

/* global describe, before, after, it */
