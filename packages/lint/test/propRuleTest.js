'use strict'

/**
 * Test for propRule.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const fs = require('fs')
const propRule = require('../lib/rules/propRule')

describe('prop-rule', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const reported = []
    await propRule({
      keypathAccess: {
        l: require.resolve('../misc/mocks/mock-loc.json'),
      },
    })({
      content: fs.readFileSync(
        require.resolve('../misc/mocks/mock-file.02.jsx'),
      ),
      filename: 'hoge.js',
      report: (...args) => reported.push(args),
    })
    equal(reported[0][0], 'Keypath not found: "msg.SOME_MESSAGE_1"')
    equal(reported[0][1].given, 'msg.SOME_MESSAGE_1')
  })
})

/* global describe, before, after, it */
