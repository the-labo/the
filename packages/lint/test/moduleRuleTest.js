'use strict'
/**
 * Test for moduleRule.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const moduleRule = require('../lib/rules/moduleRule')

describe('module-rule-test', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const reported = []
    await moduleRule({
      namedFromDefault: true,
      sameKeysWith: require.resolve('../misc/mocks/mock-file.04'),
      valuePattern: '/^//',
      valueUnique: true,
    })({
      filename: require.resolve('../misc/mocks/mock-file.01'),
      report: (...args) => reported.push(args),
    })
    equal(reported[0][0], 'Value patten not match')
    // console.log(reported)
  })
})

/* global describe, before, after, it */
