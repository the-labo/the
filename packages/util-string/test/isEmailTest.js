'use strict'

/**
 * Test for isEmail.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const isEmail = require('../lib/isEmail')

describe('is-email', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(isEmail('a@example.com'))
    ok(!isEmail('1234-5677'))
  })
})

/* global describe, before, after, it */
