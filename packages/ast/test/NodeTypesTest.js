'use strict'
/**
 * Test for NodeTypes.
 * Runs with mocha.
 */
const { throws } = require('assert').strict
const NodeTypes = require('../lib/constants/NodeTypes')

describe('node-types', () => {
  before(() => {})

  after(() => {})

  it('Should be freezed', () => {
    throws(() => {
      NodeTypes.xxx = 1
    })
  })
})

/* global describe, before, after, it */
