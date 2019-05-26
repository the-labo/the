'use strict'
/**
 * Test for create.
 * Runs with mocha.
 */
const {
  strict: { equal, ok },
} = require('assert')
const create = require('../lib/create')

describe('create', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const created = create('foo')
    ok(created)
    equal(created.name, 'foo')
  })
})

/* global describe, before, after, it */
