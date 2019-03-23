/**
 * Test for isVideoSrc.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const isVideoSrc = require('../lib/isVideoSrc')

describe('is-video-src', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    ok(isVideoSrc('foo.mp4'))
    ok(!isVideoSrc('foo.png'))
    ok(isVideoSrc('foo/bar.mp4'))
    ok(!isVideoSrc('foo/bar.png'))
    ok(isVideoSrc('http:/example.com/foo/bar.mp4'))
    ok(!isVideoSrc('http:/example.com/foo/bar.png'))
  })
})

/* global describe, before, after, it */
