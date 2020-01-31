'use strict'

/**
 * @file Test for processJSExport.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const processJSExport = require('../lib/processors/processJSExport')

describe('process-js-export', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSExport(
        `
/** this is hoge */
function Hoge() {} 

export default Hoge
        `,
      ),
      `
/** this is hoge */
function Hoge() {} 

export default Hoge
        `,
    )
  })
  it('Sort exported functions', async () => {
    equal(
      await processJSExport(`
/** This is b */
export function b () {}
/** This is a */    
export function a () {}
    `),
      `
/** This is a */    
export function a () {}
/** This is b */
export function b () {}
    `,
    )
  })

  it('Split ExportDefaultDeclaration function', async () => {
    equal(
      await processJSExport(
        `
/** this is hoge */
export default function Hoge(){

}
`,
      ),
      `
/** this is hoge */
function Hoge(){

}

export default Hoge
`,
    )
  })

  it('Split ExportDefaultDeclaration const', async () => {
    equal(
      await processJSExport(
        `
// This is a
export default class X {}
`,
      ),
      `
// This is a
class X {}

export default X
`,
    )
  })
})

/* global describe, before, after, it */
