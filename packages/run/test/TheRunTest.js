/**
 * Test for TheRun.
 * Runs with mocha.
 */
'use strict'

const TheRun = require('../lib/TheRun')
const {ok, equal} = require('assert')
const aport = require('aport')

describe('the-run', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    ok(TheRun)

    const run = new TheRun({
      inspect: await aport()
    })

    await run.run(
      `${__dirname}/../misc/mocks/mock-bin-01.js`
    )
  })

  it('Do test with error', async () => {
    ok(TheRun)

    const run = new TheRun({})

    await run.run(
      `${__dirname}/../misc/mocks/mock-bin-02.js`,
    )
  })
})

/* global describe, before, after, it */
