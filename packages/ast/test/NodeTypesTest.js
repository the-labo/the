'use strict'
/**
 * Test for NodeTypes.
 * Runs with mocha.
 */
const {
  strict: { throws },
} = require('assert')
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
