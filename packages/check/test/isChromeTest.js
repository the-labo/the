'use strict'
/**
 * Test for isChrome.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const isChrome = require('../lib/isChrome')

describe('is-chrome', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(!isChrome())
    ok(
      !isChrome({
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      }),
    )
    ok(
      isChrome({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36',
      }),
    )
  })
})

/* global describe, before, after, it */
