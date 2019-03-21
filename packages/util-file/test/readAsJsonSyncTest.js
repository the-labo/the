/**
 * Test for readAsJsonSync.
 * Runs with mocha.
 */
'use strict'

const readAsJsonSync = require('../lib/readAsJsonSync')
const {ok, equal} = require('assert')

describe('read-as-json-sync', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(
      readAsJsonSync(require.resolve('../package.json'))
    )
  })
})

/* global describe, before, after, it */
