/**
 * Test for processJSString.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const processJSString = require('../lib/processors/processJSString')

describe('process-js-string', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSString(
        `
const a = "x123"
const b = \`this is b and 'quoated'\`
const c = \`this is c with \${a}s\`
const d = \`this
is d\`
`,
      ),
      `
const a = "x123"
const b = 'this is b and \\'quoated\\''
const c = \`this is c with \${a}s\`
const d = \`this
is d\`
`,
    )
  })
})

/* global describe, before, after, it */
