'use strict'
/**
 * Test for depsRule.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
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

  it('Import from pattern', async () => {
    const reported = []
    const forbidImportFrom = '//lib$/'
    await depsRule({
      forbidImportFrom,
    })({
      content: `
import x from 'x'
`,
      filename: 'xxx.jsx',
      report: (...args) => reported.push(args),
    })
    await depsRule({
      forbidImportFrom,
    })({
      content: `
import x from 'x/lib'
`,
      filename: 'xxx.jsx',
      report: (...args) => reported.push(args),
    })
    console.log(reported[0])
    equal(reported.length, 1)
  })
})

/* global describe, before, after, it */
