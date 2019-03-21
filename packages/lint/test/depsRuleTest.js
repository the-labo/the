/**
 * Test for depsRule.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const fs = require('fs')
const depsRule = require('../lib/rules/depsRule')

describe('deps-rule', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const reported = []
    const filename = require.resolve('../misc/mocks/mock-file.03.jsx')
    await depsRule({
      importFrom: ['.jsx'],
    })({
      content: fs.readFileSync(filename),
      filename,
      report: (...args) => reported.push(args),
    })
    equal(reported.length, 1)
  })

  it('Require from ', async () => {
    const reported = []
    const filename = require.resolve('../misc/mocks/mock-file.04')
    await depsRule({
      requireFrom: ['.js'],
    })({
      content: fs.readFileSync(filename),
      filename,
      report: (...args) => reported.push(args),
    })
    equal(reported.length, 1)
  })
})

/* global describe, before, after, it */
