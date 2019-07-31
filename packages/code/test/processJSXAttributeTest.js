'use strict'

/**
 * Test for processJSXAttribute.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const processJSXAttribute = require('../lib/processors/processJSXAttribute')

describe('process-j-s-x-attribute', () => {
  before(() => {})

  after(() => {})

  it('Remove duplicate keys', async () => {
    equal(await processJSXAttribute('<div a={1} a={2}/>'), '<div a={2}/>')
    equal(
      await processJSXAttribute('<div a={1} b={3} a={2}/>'),
      '<div a={2} b={3}/>',
    )
  })

  it('Remove spared attributes', async () => {
    equal(
      await processJSXAttribute(
        '<div {...{a, b:1, [c]: 2, d(){return 123}, e: () => "abc", f: function f(){}}}></div>',
      ),
      '<div a={a} b={1} {...{[c]:2}} d={function d(){return 123}} e={() => "abc"} f={function f(){}}></div>',
    )
  })

  it('Keep order for spared', async () => {
    equal(
      await processJSXAttribute('<div z y {...props} b={1} a={2}/>'),
      '<div y z {...props} a={2} b={1}/>',
    )
  })
  it('Do test', async () => {
    equal(
      await processJSXAttribute(
        `
        const a = <div id='hoge' {...{a:b}} href='javascript:void(0)' className='d'></div>
      `,
        {
          sourceType: 'module',
        },
      ),
      `
        const a = <div a={b} className='d' href='javascript:void(0)' id='hoge'></div>
      `,
    )
  })

  it('Nested destructuring', async () => {
    equal(
      await processJSXAttribute('<div {...{...a,b}}/>'),
      '<div {...a} b={b}/>',
    )
  })
})

/* global describe, before, after, it */
