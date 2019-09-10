/**
 * Test for isImageUrl.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const isImageUrl = require('../lib/isImageUrl')

describe('is-image-url', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(isImageUrl)
    ok(!isImageUrl('http://example.com/foo/bar.txt'))
    ok(isImageUrl('http://example.com/foo/bar.jpeg'))
    ok(isImageUrl('http://example.com/foo/bar.JPEG'))
  })
})

/* global describe, before, after, it */
