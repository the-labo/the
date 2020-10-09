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
    ok(isUrl('data:,Hello%2C%20World!'))
    ok(!isUrl('http://example.com http://example.jp'))
    ok(!isUrl('data:,Hello%2C%20World!  '))
    ok(!isUrl('dat:,Hello%2C%20World!'))
  })
})

/* global describe, before, after, it */
