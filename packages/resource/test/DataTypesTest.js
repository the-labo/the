'use strict'
/**
 * Test for DataTypes.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const DataTypes = require('../lib/DataTypes')

describe('data-types', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(!DataTypes.hoge)
    ok(DataTypes.BOOLEAN)
  })
})

/* global describe, before, after, it */
