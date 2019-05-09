/**
 * Test for processJSPrettier.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
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

  it('Quote props', async () => {
    equal(
      await processJSPrettier(`
      const x = {a:1, 'b':2, [c]: 3}
      console.log(x)
      `),
      `const x = { a: 1, b: 2, [c]: 3 }
console.log(x)
`,
    )
  })

  it('resolveConfig ', async () => {
    equal(
      await processJSPrettier(`const x = (a) => a + 1`, {
        filename: `${__dirname}/../misc/mocks/custom-prettier/hoge.txt`,
      }),
      `const x = a => a + 1\n`,
    )
  })
})

/* global describe, before, after, it */
