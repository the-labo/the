'use strict'
/**
 * Test for parse.
 * Runs with mocha.
 */
const amkdirp = require('amkdirp')
const {
  strict: { equal, ok },
} = require('assert')
const fs = require('fs')
const path = require('path')
const parse = require('../lib/parse')

describe('parse', function() {
  this.timeout(3000)
  before(() => {})

  after(() => {})

  it('Simple obj', async () => {
    const parsed = parse(`
// This is comment01
const a = { 
  k1: 'v1', k2: "v2",
  /* This is k3 */
  k3: 'v3' 
}

const foo = require('a')
const { jj } = require('a/jj')

{
  const kk = require('b/kk')
}
    `)

    equal(parsed.start, 0)
    const filename = `${__dirname}/../tmp/parseResult.json`
    await amkdirp(path.dirname(filename))
    fs.writeFileSync(filename, JSON.stringify(parsed, null, 2))
  })

  it('Executable', async () => {
    const parsed = parse(
      `#!/usr/bin/env node
    
    console.log('!hey')
    `,
      {},
    )
    ok(parsed)
  })

  it('Async generators', async () => {
    const parsed = parse(`
    
    const a = async function * (){
    }
    a()
    `)
    ok(parsed)
  })

  it('Pipe line', async () => {
    const parsed = parse(`
    const twice = (v) => v ** 2
    console.log(2 |> twice) 
    `)
    ok(parsed)
  })

  it('Using flow', async () => {
    const parsed = parse(`
// @flow
function square(n: number): number {
  return n * n;
}

square("2"); // Error!
    `)
    ok(parsed)
  })
})

/* global describe, before, after, it */
