/**
 * Test for TheMedia.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const TheMedia = require('../lib/TheMedia')

describe('the-media', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheMedia)

    const media = new TheMedia({
      audio: true,
      video: false,
    })
    ok(media)
  })
})

/* global describe, before, after, it */
