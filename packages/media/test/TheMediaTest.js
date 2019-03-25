/**
 * Test for TheMedia.
 * Runs with mocha.
 */
'use strict'

const TheMedia = require('../lib/TheMedia')
const {ok, equal} = require('assert')

describe('the-media', () => {
  before(() => {
  })

  after(() => {
  })

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
