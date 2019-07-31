'use strict'

/**
 * Test for JSDoc.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const JSDoc = require('../lib/JSDoc')

describe('jsdoc', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(JSDoc)

    const jd = new JSDoc()
    await jd.generate(
      `${__dirname}/../lib`,
      `${__dirname}/../tmp/testing-doc/api`,
      {
        patterns: ['*.js'],
      },
    )
  })
})

/* global describe, before, after, it */
