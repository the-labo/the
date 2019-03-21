/**
 * Test for writeAsJson.
 * Runs with mocha.
 */
'use strict'

const writeAsJson = require('../lib/writeAsJson')
const { ok, strictEqual: equal, deepStrictEqual: deepEqual } = require('assert')

describe('write-as-json', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const obj = {
      'foo': 'bar'
    }
    obj.x = 2
    obj.a = 1
    await writeAsJson(`${__dirname}/../tmp/hoge.json`, obj)
  })
})

/* global describe, before, after, it */
