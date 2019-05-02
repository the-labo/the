/**
 * Test for processJSBlock.
 * Runs with mocha.
 */
'use strict'

const processJSBlock = require('../lib/processors/processJSBlock')

const { ok, equal, deepEqual } = require('assert').strict

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
}`), `
const a = () => {console.log('a')}
{
  console.log('hoge')
  console.log(a())
  {
    const b = 1
    console.log(b)
  }
}`,
    )
  })
})

/* global describe, before, after, it */
