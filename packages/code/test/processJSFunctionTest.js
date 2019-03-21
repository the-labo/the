/**
 * Test for processJSFunction.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
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
const a = async () => { return Promise('a') }      
const b = async () => { return Promise('b') }      
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
})

/* global describe, before, after, it */
