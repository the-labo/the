/**
 * Test for create.
 * Runs with mocha.
 */
'use strict'

const create = require('../lib/create')
const { ok, equal } = require('assert')

describe('create', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    let created = create({})
    ok(created)
  })
})

/* global describe, before, after, it */
