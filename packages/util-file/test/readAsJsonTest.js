/**
 * Test for readAsJson.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const readAsJson = require('../lib/readAsJson')

describe('read-as-json', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(await readAsJson(require.resolve('../package.json')))
  })
})

/* global describe, before, after, it */
