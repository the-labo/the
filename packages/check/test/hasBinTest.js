/**
 * Test for hasBin.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const hasBin = require('../lib/hasBin')

describe('has-bin', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(await hasBin('ls'))
    ok(!(await hasBin('hogehoge')))
  })
})

/* global describe, before, after, it */
