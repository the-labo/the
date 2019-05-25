'use strict'
/**
 * Test for create.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const create = require('../lib/create')

describe('create', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const created = create('hoge')
    ok(created)
    equal(created.status, 400)
  })
})

/* global describe, before, after, it */
