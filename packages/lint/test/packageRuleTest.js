'use strict'
/**
 * Test for packageRule.
 * Runs with mocha.
 */
const { deepEqual, equal } = require('assert').strict
const fs = require('fs')
const path = require('path')
const packageRule = require('../lib/rules/packageRule')

describe('package-rule', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const reported = []
    const filename = require.resolve(
      '../misc/mocks/mock-project01/package.json',
    )
    const dirname = path.dirname(filename)
    await packageRule({
      depsUsedIn: path.join(dirname, '*.js'),
      devDepsUsedIn: path.join(dirname, '*.js'),
      except: ['fugefuge'],
    })({
      content: fs.readFileSync(filename),
      filename,
      report: (...args) => reported.push(args),
    })
    equal(reported.length, 1)
    deepEqual(reported[0][1].dependencies, ['hogehoge'])
  })
})

/* global describe, before, after, it */
