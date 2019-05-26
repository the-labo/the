'use strict'
/**
 * Test for create.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const create = require('../lib/create')

describe('create', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const created = create()
    equal(typeof created, 'function')
  })
})

/* global describe, before, after, it */
