/**
 * Test for Jsdoc.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const Jsdoc = require('../lib/Jsdoc')

describe('jsdoc', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(Jsdoc)

    const jd = new Jsdoc()
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
