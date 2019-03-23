/**
 * Test for newId.
 * Runs with mocha.
 */
'use strict'

const newId = require('../lib/newId')
const { ok, notEqual } = require('assert').strict

describe('new-id', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(newId())
    notEqual(newId(), newId())
  })
})

/* global describe, before, after, it */
