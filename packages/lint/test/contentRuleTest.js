'use strict'
/**
 * Test for contentRule.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const contentRule = require('../lib/rules/contentRule')

describe('content-rule', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const reported = []
    await contentRule({
      endsWithNewLine: true,
      maxLines: 3,
    })({
      content: `hoge
      fuge
      l2
      l3`,
      filename: 'hoge.js',
      report: (...a) => {
        reported.push(a)
      },
    })
    equal(reported.length, 2)
  })
})

/* global describe, before, after, it */
