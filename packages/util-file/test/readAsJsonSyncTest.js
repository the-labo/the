'use strict'

/**
 * Test for readAsJsonSync.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const readAsJsonSync = require('../lib/readAsJsonSync')

describe('read-as-json-sync', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(readAsJsonSync(require.resolve('../package.json')))
  })
})

/* global describe, before, after, it */
