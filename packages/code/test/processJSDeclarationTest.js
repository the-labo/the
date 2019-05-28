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

  it('Combine object pattern', async () => {
    equal(
      await processJSDeclaration(`
const {a, ...e} = x
const d = 1
const {b} = x
console.log(c)
y = () => {
  const {c} = x
  const {d} = x
  console.log(c,d)
}
`),
      `
const {a, b, ...e} = x
const d = 1

console.log(c)
y = () => {
  const {c, d} = x
  
  console.log(c,d)
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

  it('Combine as grouping', async () => {
    equal(
      await processJSDeclaration(`
const {a} = x
const {b} = x
doSomething()
const {c} = x
const {d} = x
`),
      `
const {a, b} = x

doSomething()
const {c, d} = x

`,
    )
  })

  it('Combine sub destructing', async () => {
    equal(
      await processJSDeclaration(`
const { y, z } = x
const { a, b } = y
console.log(y, a, b, z)
`),
      `
const { y, y: { a, b }, z } = x

console.log(y, a, b, z)
`,
    )
    equal(
      await processJSDeclaration(`
const { w, y:yy} = x
const { a } = yy`),
      `
const { w, y:yy, y: { a }} = x
`,
    )
  })

  it('Destructuring with alias usage', async () => {
    equal(
      await processJSDeclaration('const { a = b, b } = x'),
      'const { a = x.b, b } = x',
    )
    equal(
      await processJSDeclaration('const { a = b, b = 1 } = x'),
      'const { a = b, b = 1 } = x',
    )
    equal('const {a:{b:{c}}, d = c} = x', 'const {a:{b:{c}}, d = c} = x')
  })

  it('Combine nested', async () => {
    equal(
      await processJSDeclaration(
        'const { a: {b}, e, a: {c = 2, d: {f}}, d } = x',
      ),
      'const { a: { b, c = 2, d: {f} }, e, d } = x',
    )
  })
})

/* global describe, before, after, it */
