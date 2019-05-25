'use strict'
/**
 * Test for writeAsJson.
 * Runs with mocha.
 */
const writeAsJson = require('../lib/writeAsJson')

describe('write-as-json', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const obj = {
      foo: 'bar',
    }
    obj.x = 2
    obj.a = 1
    await writeAsJson(`${__dirname}/../tmp/hoge.json`, obj)
  })
})

/* global describe, before, after, it */
