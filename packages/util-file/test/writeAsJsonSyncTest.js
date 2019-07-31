'use strict'

/**
 * Test for writeAsJsonSync.
 * Runs with mocha.
 */
const writeAsJsonSync = require('../lib/writeAsJsonSync')

describe('write-as-json-sync', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const obj = {
      foo: 'bar',
    }
    obj.x = 2
    obj.a = 1
    writeAsJsonSync(`${__dirname}/../tmp/hoge.json`, obj)
  })

  it('JSON5', () => {
    writeAsJsonSync(`${__dirname}/../tmp/hoge.json5`, {
      foo: 'bar',
    })
  })
})

/* global describe, before, after, it */
