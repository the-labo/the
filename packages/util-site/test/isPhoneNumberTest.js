/**
 * Test for isPhoneNumber.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const isPhoneNumber = require('../lib/isPhoneNumber')

describe('is-phone-number', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(isPhoneNumber('090-123-5678'))
    ok(isPhoneNumber('30-1234-5678'))
    ok(!isPhoneNumber('a@example.com'))
  })
})

/* global describe, before, after, it */
