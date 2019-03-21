/**
 * Test for usageRule.
 * Runs with mocha.
 */
'use strict'

const usageRule = require('../lib/rules/usageRule')
const fs = require('fs')
const path = require('path')
const { ok, equal, deepEqual } = require('assert').strict

describe('usage-rule', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const reported = []
    const filename = require.resolve('../misc/mocks/mock-file.03.jsx')
    await usageRule({
      usedIn: `${__dirname}/../lib/*.*`,
    })({
      filename,
      content: fs.readFileSync(
        filename
      ),
      report: (...args) => reported.push(args)
    })
    equal(reported.length, 1)
  })

  it('SkipOwn', async () => {
    const reported = []
    const filename = require.resolve('../misc/mocks/mock-file.03.jsx')
    await usageRule({
      usedIn: `${path.dirname(filename)}/*.*`,
    })({
      filename,
      content: fs.readFileSync(
        filename
      ),
      report: (...args) => reported.push(args)
    })
    equal(reported.length, 1)
  })

  it('Call mock-loc', async () => {
    const reported = []
    const filename = require.resolve('../misc/mocks/mock-loc.json')
    await usageRule({
      keysUsedIn: `${path.dirname(filename)}/*.*`,
    })({
      filename,
      content: fs.readFileSync(
        filename
      ),
      report: (...args) => reported.push(args)
    })
    ok(reported[0])
  })
})

/* global describe, before, after, it */
