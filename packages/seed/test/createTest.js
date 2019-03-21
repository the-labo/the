/**
 * Test for create.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const create = require('../lib/create')

describe('create', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    let created = create('ja', {})
    ok(created)
  })
})

/* global describe, before, after, it */
