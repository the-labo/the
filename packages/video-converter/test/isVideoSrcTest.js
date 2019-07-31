'use strict'

/**
 * Test for isVideoSrc.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const isVideoSrc = require('../lib/helpers/isVideoSrc')

describe('is-video-src', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(isVideoSrc('hoge.mp4'))
    ok(isVideoSrc('hoge.mp4?a=z'))
    ok(isVideoSrc('https://example.com/foo/bar/hoge.mp4?a=z'))
    ok(!isVideoSrc('hoge.png'))
  })
})

/* global describe, before, after, it */
