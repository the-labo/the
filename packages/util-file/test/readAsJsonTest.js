/**
 * Test for readAsJson.
 * Runs with mocha.
 */
'use strict'

const readAsJson = require('../lib/readAsJson')
const { ok, strictEqual: equal, deepStrictEqual: deepEqual } = require('assert')

describe('read-as-json', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    ok(
      await readAsJson(require.resolve('../package.json'))
    )
  })
})

/* global describe, before, after, it */
