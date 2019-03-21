/**
 * Test for create.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert')
const create = require('../lib/create')

describe('create', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    let created = create('foo')
    ok(created)
    equal(created.name, 'foo')
  })
})

/* global describe, before, after, it */
