/**
 * Test for fileSizeOf.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const fileSizeOf = require('../lib/fileSizeOf')

describe('file-size-of', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(await fileSizeOf(__filename))
  })
})

/* global describe, before, after, it */
