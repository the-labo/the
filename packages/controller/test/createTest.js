'use strict'

/**
 * Test for create.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const create = require('../lib/create')

describe('create', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const created = create({})
    ok(created)
  })
})

/* global describe, before, after, it */
