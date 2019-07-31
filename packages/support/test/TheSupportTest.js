'use strict'

/**
 * Test for TheSupport.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const TheSupport = require('../lib/TheSupport')

describe('the-support', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheSupport)

    const support = new TheSupport(`${__dirname}/../misc/mocks/es-6-script.js`)

    await support.es2015()
    {
      const caught = await support
        .es5()
        .then(() => null)
        .catch((e) => e)
      ok(caught)
    }
  })

  it('Using eval', async () => {
    ok(TheSupport)

    const support = new TheSupport(`${__dirname}/../misc/mocks/eval-script.js`)

    await support.es2015()
    {
      const caught = await support
        .es5()
        .then(() => null)
        .catch((e) => e)
      ok(caught)
    }
  })
})

/* global describe, before, after, it */
