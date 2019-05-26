'use strict'
/**
 * Test for processJSDeclaration.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
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

  it('Const on object destructure', async () => {
    equal(
      await processJSDeclaration('let {a, b} = x;console.log(x, b)'),
      'const {a, b} = x;console.log(x, b)',
    )
    equal(
      await processJSDeclaration('let {a, b} = x;b=2;console.log(x, b)'),
      'let {a, b} = x;b=2;console.log(x, b)',
    )
    equal(
      await processJSDeclaration('let {a, b:c} = x;c=3;console.log(x, c)'),
      'let {a, b:c} = x;c=3;console.log(x, c)',
    )
    equal(
      await processJSDeclaration('let {a, b:d=2} = x;d=3;console.log(x, c)'),
      'let {a, b:d=2} = x;d=3;console.log(x, c)',
    )
    equal(
      await processJSDeclaration('let {a:{b}} = x;console.log(b)'),
      'const {a:{b}} = x;console.log(b)',
    )
    equal(
      await processJSDeclaration('let {a:{b}} = x;b=2;console.log(b)'),
      'let {a:{b}} = x;b=2;console.log(b)',
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

  it('Compile object pattern', async () => {
    equal(
      await processJSDeclaration(`
const {a} = x
const {b} = x
y = () => {
  const {c} = x
  const {d} = x
}
`),
      `
const {a, b} = x
y = () => {
  const {c, d} = x  
}
`,
    )
    equal(
      await processJSDeclaration(`
const {a} = x
const {b:bb} = x
const {b:bbb} = x
const {c=2} = x
const {d: dd=3} = x
const {e: {f}} = x
const {e2: {f2}} = x
`),
      `
const {a, b:bb, b:bbb, c=2, d: dd=3, e: {f}, e2: {f2}} = x
`,
    )
  })
})

/* global describe, before, after, it */
