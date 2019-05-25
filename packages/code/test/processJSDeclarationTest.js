'use strict'
/**
 * Test for processJSDeclaration.
 * Runs with mocha.
 */
const { equal } = require('assert').strict
const processJSDeclaration = require('../lib/processors/processJSDeclaration')

describe('process-js-declarations', () => {
  before(() => {})

  after(() => {})

  it('Split multiple declarations', async () => {
    equal(
      await processJSDeclaration(`
const z = () => {
  let a = 1, b = 2
}
`),
      `
const z = () => {
  const a = 1
  const b = 2
}
`,
    )
  })

  it('Do test', async () => {
    equal(
      await processJSDeclaration(`
const a = () => { 
  let x = 1
  var x2 = 1
  let y = 2
  let w = 1
  let z = 1
  y = 5 
  function zz(){z++}
  function ww(){w+=1}
  zz()
  return x + y + w + z
}
`),
      `
const a = () => { 
  const x = 1
  const x2 = 1
  let y = 2
  let w = 1
  let z = 1
  y = 5 
  function zz(){z++}
  function ww(){w+=1}
  zz()
  return x + y + w + z
}
`,
    )
  })

  it('Destructor if possible', async () => {
    equal(await processJSDeclaration('const a = x.a'), 'const { a } = x')
    equal(await processJSDeclaration('const a = x.b'), 'const { b: a } = x')
    equal(await processJSDeclaration('const a = x[b]'), 'const a = x[b]')
    equal(
      await processJSDeclaration('const a = x.b.c'),
      'const { b: { c: a } } = x',
    )
    equal(
      await processJSDeclaration('const { c } = x.a'),
      'const { a: { c } } = x',
    )
    equal(
      await processJSDeclaration('const [ c ] = x.a'),
      'const { a: [ c ] } = x',
    )
    equal(
      await processJSDeclaration("const a = require('x').a"),
      "const { a } = require('x')",
    )
    equal(
      await processJSDeclaration("const b = require('x').a"),
      "const { a: b } = require('x')",
    )
  })

  it('Array Destructor if possible', async () => {
    equal(await processJSDeclaration('const a = x[1]'), 'const [ , a ] = x')
    equal(await processJSDeclaration('const a = x[3]'), 'const [ , , , a ] = x')
    equal(
      await processJSDeclaration('const [ a ] = x[1]'),
      'const [ , [ a ] ] = x',
    )
    equal(
      await processJSDeclaration('const { a } = x[1]'),
      'const [ , { a } ] = x',
    )

    equal(
      await processJSDeclaration("const shortName = name.split('@')[0]"),
      "const [ shortName ] = name.split('@')",
    )
  })
})

/* global describe, before, after, it */
