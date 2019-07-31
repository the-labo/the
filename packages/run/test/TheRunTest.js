'use strict'

/**
 * Test for TheRun.
 * Runs with mocha.
 */
const aport = require('aport')
const {
  strict: { ok },
} = require('assert')
const TheRun = require('../lib/TheRun')

describe('the-run', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheRun)

    const run = new TheRun({
      inspect: await aport(),
    })

    await run.run(`${__dirname}/../misc/mocks/mock-bin-01.js`)
  })

  it('Do test with error', async () => {
    ok(TheRun)

    const run = new TheRun({})

    await run.run(`${__dirname}/../misc/mocks/mock-bin-02.js`)
  })
})

/* global describe, before, after, it */
