'use strict'

/**
 * Test for copyAsJsonSync.
 * Runs with mocha.
 */
const copyAsJsonSync = require('../lib/copyAsJsonSync')

describe('copy-as-json-sync', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    copyAsJsonSync(
      require.resolve('../package.json'),
      `${__dirname}/../tmp/hoge/hoge/e.json`,
    )
  })
})

/* global describe, before, after, it */
