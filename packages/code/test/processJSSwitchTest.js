'use strict'
/**
 * Test for processJSSwitch.
 * Runs with mocha.
 */
const { equal } = require('assert').strict
const processJSSwitch = require('../lib/processors/processJSSwitch')

describe('process-js-switch', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSSwitch(`
const a = () => {
  switch (x) {
    case 'd':{
      console.log('This is d')
      break
    }
    case a:
    case d:
      console.log('hoge')
      break
    case j:
      return 'X'
    default:
      break
    case b:
      break
    
  }
}
      `),
      `
const a = () => {
  switch (x) {
    case 'd':{
      console.log('This is d')
      break
    }
    case a:
    case d:
      console.log('hoge')
      break
    case b:
      break
    case j:
      return 'X'
    default:
      break
    
  }
}
      `,
    )
  })

  it('With comments', async () => {
    equal(
      await processJSSwitch(`
switch (z) {
  // hoge
  case x:
  case z:
    console.log('this is it!')
    break
  case a:
    break
}
      `),
      `
switch (z) {
  case a:
    break
  // hoge
  case x:
  case z:
    console.log('this is it!')
    break
}
      `,
    )
  })
})

/* global describe, before, after, it */
