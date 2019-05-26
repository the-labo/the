'use strict'
/**
 * Test for isFirefox.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const isFirefox = require('../lib/isFirefox')

describe('is-firefox', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(!isFirefox())
    ok(
      isFirefox({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:65.0) Gecko/20100101 Firefox/65.0',
      }),
    )
  })
})

/* global describe, before, after, it */
