/**
 * Test for TheLint.
 * Runs with mocha.
 */
'use strict'

const TheLint = require('../lib/TheLint')
const rules = require('../lib/rules')
const {ok, equal} = require('assert')

describe('the-lint', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    ok(TheLint)

    const lint = new TheLint()

    lint.add(
      `${__dirname}/../misc/mocks/*.js`,
      rules.moduleRule({
        type: 'function'
      })
    )

    lint.add(
      `${__dirname}/../misc/mocks/*.js`,
      rules.contentRule({
        endsWithNewLine: true,
      })
    )

    await lint.run()
  })
})

/* global describe, before, after, it */
