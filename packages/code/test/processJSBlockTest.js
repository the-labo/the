/**
 * Test for processJSBlock.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const processJSBlock = require('../lib/processors/processJSBlock')

describe('process-js-block', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSBlock(`
const a = () => {console.log('a')}
{
  console.log('hoge')
  {
    console.log(a())
  }
  {
    const b = 1
    console.log(b)
  }
}`),
      `
const a = () => {console.log('a')}
console.log('hoge')
  console.log(a())
  {
    const b = 1
    console.log(b)
  }`,
    )
  })

  it('remove redundant func body block', async () => {
    equal(
      await processJSBlock(`
async function hoge(){
  { const a = 1; console.log(a) }
  { console.log('b') }
  {
    for(const c of [1,2,3]) {
      console.log('c', c)
    }
  }
}
  `),
      `
async function hoge(){
  { const a = 1; console.log(a) }
  console.log('b')
  for(const c of [1,2,3]) {
      console.log('c', c)
    }
}
  `,
    )
  })
})

/* global describe, before, after, it */
