/**
 * Test for isVideoUrl.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const isVideoUrl = require('../lib/isVideoUrl')

describe('is-video-url', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(isVideoUrl)
    ok(isVideoUrl('http:/example.com/foo/bar.mp4'))
    ok(!isVideoUrl('http:/example.com/foo/bar.png'))
    ok(!isVideoUrl('data:image/png;base64,iVBORw0KG'))
    ok(isVideoUrl('data:video/png;base64,iVBORw0KG'))
  })
})

/* global describe, before, after, it */
