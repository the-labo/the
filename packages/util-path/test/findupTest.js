'use strict'
/**
 * Test for findup.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const findup = require('../lib/findup')

describe('findup', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(await findup('package.json', { base: __dirname }))
    ok(findup.sync('package.json', { base: __dirname }))
  })
})

/* global describe, before, after, it */
