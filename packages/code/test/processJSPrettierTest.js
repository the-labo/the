/**
 * Test for processJSPrettier.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert')
const processJSPrettier = require('../lib/processors/processJSPrettier')

describe('process-j-s-prettier', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSPrettier(`
const a = x => y
const b = 123;
      `),
      `const a = (x) => y
const b = 123
`,
    )
  })

  it('Do block', async () => {
    equal(
      await processJSPrettier(`
      function a () {
        
        console.log('This is a')
        
      }
      `),
      `function a() {
  console.log('This is a')
}
`,
    )
  })
})

/* global describe, before, after, it */
