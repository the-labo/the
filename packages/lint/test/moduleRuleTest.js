/**
 * Test for moduleRule.
 * Runs with mocha.
 */
'use strict'

const moduleRule = require('../lib/rules/moduleRule')
const { ok, equal } = require('assert').strict

describe('default-export-rule', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const reported = []
    await moduleRule({
      valuePattern: '/^\//',
      valueUnique: true,
      namedFromDefault: true,
      sameKeysWith: require.resolve('../misc/mocks/mock-file.04'),
    })({
      filename: require.resolve('../misc/mocks/mock-file.01'),
      report: (...args) => reported.push(args)
    })
    equal(reported[0][0], 'Value patten not match')
    // console.log(reported)

  })
})

/* global describe, before, after, it */
