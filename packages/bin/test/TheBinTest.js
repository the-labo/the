/**
 * Test for TheBin.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const TheBin = require('../lib/TheBin')

describe('the-bin', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheBin)

    const ls = new TheBin('ls')
    ok(await ls.exists())
    await ls.exec('-l')

    const invalid = new TheBin(`__some_invalid_cmd_`)
    ok(!(await invalid.exists()))
  })

  it('Get version', async () => {
    const node = new TheBin('node')
    const nodeVersion = await node.version()
    ok(nodeVersion)
    ok(await node.satisfiesVersion('>=8'))
    ok(!(await node.satisfiesVersion('<1')))
  })

  it('Verify', async () => {
    const npm = new TheBin('npm')
    ok(await npm.verify({ version: '>=1' }))
  })
})

/* global describe, before, after, it */
