/**
 * Test for hasBin.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const hasBin = require('../lib/hasBin')

describe('has-bin', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(hasBin)
    ok(await hasBin('node'))
    ok(!(await hasBin('_invalid_bin_12345')))
  })
})

/* global describe, before, after, it */
