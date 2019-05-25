'use strict'
/**
 * Test for create.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
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
