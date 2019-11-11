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
    ok(isImageUrl('data:image/png;base64,iVBORw0KG'))
    ok(!isImageUrl('data:video/png;base64,iVBORw0KG'))
  })
})

/* global describe, before, after, it */
