/**
 * Test for readAsJsonSync.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const readAsJsonSync = require('../lib/readAsJsonSync')

describe('read-as-json-sync', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(readAsJsonSync(require.resolve('../package.json')))
  })
})

/* global describe, before, after, it */
