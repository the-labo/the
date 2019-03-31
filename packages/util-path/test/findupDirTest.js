/**
 * Test for findupDir.
 * Runs with mocha.
 */
'use strict'

const findupDir = require('../lib/findupDir')
const path = require('path')
const { ok, strictEqual: equal, deepStrictEqual: deepEqual } = require('assert')

describe('findup-dir', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const found = await findupDir(__dirname, {
      contains: 'package.json'
    })
    equal(
      found,
      path.resolve(__dirname, '..')
    )
  })
})

/* global describe, before, after, it */
