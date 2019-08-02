'use strict'

/**
 * Test for isVideoSrc.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const isVideoSrc = require('../lib/isVideoSrc')

describe('is-video-src', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    ok(isVideoSrc('foo.mp4'))
    ok(!isVideoSrc('foo.png'))
    ok(!isVideoSrc('foo'))
    ok(!isVideoSrc('/'))
    ok(isVideoSrc('foo/bar.mp4'))
    ok(isVideoSrc('foo/bar.baz.mp4'))
    ok(!isVideoSrc('foo/bar.png'))
    ok(isVideoSrc('http:/example.com/foo/bar.mp4'))
    ok(!isVideoSrc('http:/example.com/foo/bar.png'))
  })
})

/* global describe, before, after, it */
