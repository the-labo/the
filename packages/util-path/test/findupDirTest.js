/**
 * Test for findupDir.
 * Runs with mocha.
 */
'use strict'

const { strictEqual: equal } = require('assert')
const path = require('path')
const findupDir = require('../lib/findupDir')

describe('findup-dir', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const found = await findupDir(__dirname, {
      contains: 'package.json',
    })
    equal(found, path.resolve(__dirname, '..'))
  })
})

/* global describe, before, after, it */
