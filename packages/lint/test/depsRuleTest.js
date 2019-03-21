/**
 * Test for depsRule.
 * Runs with mocha.
 */
'use strict'

const depsRule = require('../lib/rules/depsRule')
const fs = require('fs')
const { ok, equal } = require('assert').strict

describe('deps-rule', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const reported = []
    const filename = require.resolve('../misc/mocks/mock-file.03.jsx')
    await depsRule({
      importFrom: ['.jsx'],
    })({
      filename,
      content: fs.readFileSync(
        filename
      ),
      report: (...args) => reported.push(args)
    })
    equal(reported.length, 1)
  })

  it('Require from ', async () => {
    const reported = []
    const filename = require.resolve('../misc/mocks/mock-file.04')
    await depsRule({
      requireFrom: ['.js'],
    })({
      filename: filename,
      content: fs.readFileSync(
        filename
      ),
      report: (...args) => reported.push(args)
    })
    equal(reported.length, 1)
  })
})

/* global describe, before, after, it */
