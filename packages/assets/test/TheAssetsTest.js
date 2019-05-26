'use strict'
/**
 * Test for TheAssets.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const TheAssets = require('../lib/TheAssets')

describe('the-assets', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheAssets)

    const assets = new TheAssets({})

    return assets.installTo(`${__dirname}/../tmp/foo/public`)
  })
})

/* global describe, before, after, it */
