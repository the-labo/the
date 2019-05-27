'use strict'
/**
 * Test for processJSIf.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const processJSIf = require('../lib/processors/processJSIf')

describe('process-js-if', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSIf("if (x) { console.log('x') } else if (y) {} else {}"),
      "if (x) { console.log('x') }",
    )
    equal(
      await processJSIf(
        "if (x) { console.log('x2') } else if (y) {} else { /* this is else */}",
      ),
      "if (x) { console.log('x2') } else if (y) {} else { /* this is else */}",
    )
  })
  it('Without body', async () => {
    equal(
      await processJSIf(`
if (x > 1) a()
else b()
`),
      `
if (x > 1) a()
else b()
`,
    )
  })
})

/* global describe, before, after, it */
