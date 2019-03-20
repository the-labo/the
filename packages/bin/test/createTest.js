/**
 * Test for create.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert')
const create = require('../lib/create')

describe('create', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const created = create('node')
    equal(typeof created, 'function')
    equal(typeof created.exec, 'function')
    equal(typeof created.exists, 'function')
  })
})

/* global describe, before, after, it */
