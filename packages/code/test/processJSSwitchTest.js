'use strict'

/**
 * Test for processJSSwitch.
 * Runs with mocha.
 */
const {
  strict: { equal, ok },
} = require('assert')
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

  it('Bug fix 2019/08/03', async () => {
    ok(
      await processJSSwitch(`
const convertExpressionContainer = (Container) => {
      const { expression, range } = Container
      switch (expression && expression.type) {
        case NodeTypes.JSXElement:
          return replace(range, get(expression.range))
        case NodeTypes.StringLiteral:
          return replace(range, expression.value)
        default:
      }
    }
`),
    )
  })
})

/* global describe, before, after, it */
