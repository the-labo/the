/**
 * Test for isUrl.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const isUrl = require('../lib/isUrl')

describe('is-url', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(isUrl)
    ok(isUrl('http://example.com'))
    ok(isUrl('https://example.com/foo/bar'))
  })
})

/* global describe, before, after, it */
