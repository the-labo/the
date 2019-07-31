'use strict'

/**
 * Test for processJSFunction.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const processJSFunction = require('../lib/processors/processJSFunction')

describe('process-js-function', () => {
  before(() => {})

  after(() => {})

  it('Cleanup return await', async () => {
    equal(
      await processJSFunction(`
const z = async () => await Promise('z')
const a = async () => { return await Promise('a') }      
const b = async () => { return Promise('b') }      
const c = async () => { try { return await Promise('c') } catch (e) {} }
const d = async function () { return await Promise('d') }      
const e = function () { return Promise('e') }      
async function f() { return await Promise('f') }
async function g() { if (1>2) return console.log('hoge') }
      `),
      `
const z = async () => Promise('z')
const a = async () => Promise('a')      
const b = async () => Promise('b')      
const c = async () => { try { return await Promise('c') } catch (e) {} }
const d = async function () { return Promise('d') }      
const e = function () { return Promise('e') }      
async function f() { return Promise('f') }
async function g() { if (1>2) return console.log('hoge') }
      `,
    )
  })

  it('Return await on class methods', async () => {
    equal(
      await processJSFunction(`
class X {
  a = async () => await Promise('a') 
  async b() { return await Promise('b') } 
  static async c() { return await Promise('c') } 
  static async #d() { return await Promise('d') } 
  static async #e() { return Promise('e') } 
}
      `),
      `
class X {
  a = async () => Promise('a') 
  async b() { return Promise('b') } 
  static async c() { return Promise('c') } 
  static async #d() { return Promise('d') } 
  static async #e() { return Promise('e') } 
}
      `,
    )
  })

  it('Return await on class methods 2', async () => {
    equal(
      await processJSFunction(`
class J {
  async h () {
    if (x>2) {
      return
    }
    return await Promise.resolve(1)
  } 
}
      `),
      `
class J {
  async h () {
    if (x>2) {
      return
    }
    return Promise.resolve(1)
  } 
}
      `,
    )
  })

  it('Object methods', async () => {
    equal(
      await processJSFunction(`
const systemSentenceManager = {
    async a() {
      return await Promise(1)
    },
}
    `),
      `
const systemSentenceManager = {
    async a() {
      return Promise(1)
    },
}
    `,
    )
  })

  it('Expression on simple return', async () => {
    equal(
      await processJSFunction("const a = () => { return 'a' }"),
      "const a = () => 'a'",
    )
    equal(
      await processJSFunction(
        "const a = () => { /* comment 01 */ return 'a' }",
      ),
      "const a = () => { /* comment 01 */ return 'a' }",
      'Keep body with comment',
    )
    equal(
      await processJSFunction("function a () { return 'a' }"),
      "function a () { return 'a' }",
    )
    equal(
      await processJSFunction("const a = { say: () => { return 'a' } }"),
      "const a = { say: () => 'a' }",
    )

    equal(
      await processJSFunction('() => { return { a: 1 } }'),
      '() => ({ a: 1 })',
    )
  })

  it('Direct return variable', async () => {
    equal(
      await processJSFunction(`
const a = () => {
  // this is b
  const b = 1
  return b
}
      `),
      `
const a = () => {
  // this is b 
  return 1 
}
      `,
    )
  })
})

/* global describe, before, after, it */
