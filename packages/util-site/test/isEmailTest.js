/**
 * Test for isEmail.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
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
