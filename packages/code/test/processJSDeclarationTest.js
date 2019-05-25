/**
 * Test for processJSDeclaration.
 * Runs with mocha.
 */
'use strict'

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
    equal(await processJSDeclaration(`const a = x.a`), `const { a } = x`)
    equal(await processJSDeclaration(`const a = x.b`), `const { b: a } = x`)
    equal(await processJSDeclaration(`const a = x.b.c`), `const { c: a } = x.b`)
    equal(await processJSDeclaration(`const { c } = x.a`), `const { c } = x.a`)
  })
})

/* global describe, before, after, it */
