/**
 * Test for TheLint.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const rules = require('../lib/rules')
const TheLint = require('../lib/TheLint')

describe('the-lint', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheLint)

    const lint = new TheLint()
    await lint.clearCache()

    lint.add(
      `${__dirname}/../misc/mocks/*.js`,
      rules.moduleRule({
        type: 'function',
      }),
    )

    lint.add(
      `${__dirname}/../misc/mocks/*.js`,
      rules.contentRule({
        endsWithNewLine: true,
      }),
    )

    await lint.run()
  })
})

/* global describe, before, after, it */
