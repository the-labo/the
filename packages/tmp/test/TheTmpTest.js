/**
 * Test for TheTmp.
 * Runs with mocha.
 */
'use strict'

const { doesNotThrow, ok, throws } = require('assert').strict
const fs = require('fs')
const TheTmp = require('../lib/TheTmp')

describe('the-tmp', () => {
  before(() => {})

  after(() => {})

  it('Do file test', async () => {
    const tmp = new TheTmp()
    let created
    await tmp.while(
      async (filename) => {
        console.log('generated file', filename)
        created = filename
        ok(fs.statSync(filename))
      },
      { prefix: 'the-test-tmp' },
    )

    throws(() => fs.statSync(created))
  })

  it('Do file sync test', async () => {
    const tmp = new TheTmp()
    const { cleanup, path: filename } = tmp.generateSync()
    ok(filename)
    doesNotThrow(() => fs.statSync(filename))
    cleanup()
    throws(() => fs.statSync(filename))
  })

  it('Do dir sync test', async () => {
    const tmp = new TheTmp()
    const { cleanup, path: dirname } = tmp.generateDirSync()
    ok(dirname)
    doesNotThrow(() => fs.statSync(dirname))
    cleanup()
    throws(() => fs.statSync(dirname))
  })

  it('Generate dir', async () => {
    const tmp = new TheTmp()
    let created
    await tmp.whileDir(
      async (dirname) => {
        console.log('generated dir', dirname)
        created = dirname
        ok(fs.statSync(dirname))
      },
      { prefix: 'the-test-tmp' },
    )

    throws(() => fs.statSync(created))
  })
})

/* global describe, before, after, it */
