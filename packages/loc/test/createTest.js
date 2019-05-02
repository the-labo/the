/**
 * Test for create.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const create = require('../lib/create')

describe('create', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    let created = create({})
    ok(created)
  })
})

/* global describe, before, after, it */
