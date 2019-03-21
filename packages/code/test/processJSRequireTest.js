/**
 * Test for processJSRequire.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert')
const processJSRequire = require('../lib/processors/processJSRequire')

describe('process-require', async () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSRequire(`
const x = require('x')
const a = require('a')
const {jj} = require('j/jj')
      `),
      `
const a = require('a')
const {jj} = require('j/jj')
const x = require('x')
      `,
    )
  })

  it('Move none declare', async () => {
    equal(
      await processJSRequire(`#!/bin/bash node
/** abc */
'use strict'

const x = require('x')

function hoge(){

}

const x0 = x[0]
const a = require('a')
`),
      `#!/bin/bash node
/** abc */
'use strict'

const a = require('a')
const x = require('x')

function hoge(){

}
const x0 = x[0]
`,
    )
  })

  it('With default', async () => {
    equal(
      await processJSRequire(`
const z = require('z')
const pkg = require('./package.json')
const theSeat = require('b-seat').default
const a = require('a')
`),
      `
const a = require('a')
const theSeat = require('b-seat').default
const z = require('z')
const pkg = require('./package.json')
`,
    )
  })

  it('Normalize path', async () => {
    equal(
      await processJSRequire(`const x = require('../b/x')`, {
        filename: '/a/b/c.js',
      }),
      `const x = require('./x')`,
    )
  })

  it('Remove ext path', async () => {
    equal(
      await processJSRequire(`const x = require('../b/x.js')`, {
        filename: '/a/b/c.js',
      }),
      `const x = require('./x')`,
    )
  })

  it('Swap with comment line', async () => {
    equal(
      await processJSRequire(`
const x = require('x')
const a = require('a') // This is a
// This is b
const b = require('b')
`),
      `
const a = require('a') // This is a
const b = require('b')
// This is b
const x = require('x')
`,
    )
  })

  //   it('Blocked content', async () => {
  //     console.log(
  //       await processJSRequire(`
  // // Inject global variables
  //   const globalInjection = require('./globalInjection')
  //   Object.assign(global, globalInjection())
  //
  // const theServer = require('@the-/server').default
  //
  //       `)
  //     )
  //   })
})

/* global describe, before, after, it */
