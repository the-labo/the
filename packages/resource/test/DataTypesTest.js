/**
 * Test for DataTypes.
 * Runs with mocha.
 */
'use strict'

const DataTypes = require('../lib/DataTypes')
const {ok, equal} = require('assert')

describe('data-types', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(!DataTypes.hoge)
    ok(DataTypes.BOOLEAN)
  })
})

/* global describe, before, after, it */
