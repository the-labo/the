/**
 * Test for parseUrl.
 * Runs with mocha.
 */
'use strict'

const parseUrl = require('../lib/parseUrl')
const { ok, equal, deepEqual } = require('assert').strict

describe('parse-url', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const parsed = parseUrl('http://localhost:300/hoge.js?v=1')
    equal(parsed.query.v, '1')
    equal(parsed.hostname, 'localhost')
  })
})

/* global describe, before, after, it */
