'use strict'
/**
 * Test for refOf.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const refOf = require('../lib/refOf')

describe('ref-of', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(refOf({ $$as: 'User', id: 3 }), 'User#3')
  })
})

/* global describe, before, after, it */
