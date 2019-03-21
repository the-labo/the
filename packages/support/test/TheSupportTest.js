/**
 * Test for TheSupport.
 * Runs with mocha.
 */
'use strict'

const TheSupport = require('../lib/TheSupport')
const {ok, equal} = require('assert')

describe('the-support', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    ok(TheSupport)

    const support = new TheSupport(`${__dirname}/../misc/mocks/es-6-script.js`)

    await support.es2015()
    {
      const caught = await support.es5().then(() => null).catch((e) => e)
      ok(caught)
    }

  })
})

/* global describe, before, after, it */
