/**
 * Test for isVideoSrc.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
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
