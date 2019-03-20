/**
 * Test for isiOS.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const isiOS = require('../lib/isiOS')

describe('isi-o-s', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(
      isiOS({
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      }),
    )
    ok(!isiOS())
    ok(
      !isiOS({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:65.0) Gecko/20100101 Firefox/65.0',
      }),
    )

    ok(
      !isiOS.webview({
        userAgent:
          '"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15" = $1',
      }),
    )
    ok(
      isiOS.webview({
        userAgent:
          'Mozilla/5.0 (iPad; CPU OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E216',
      }),
    )
  })
})

/* global describe, before, after, it */
