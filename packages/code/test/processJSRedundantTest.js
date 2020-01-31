/**
 * @file Test for processJSRedundant.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const processJSRedundant = require('../lib/processors/processJSRedundant')

describe('process-js-redundant', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(processJSRedundant)
    equal(
      await processJSRedundant('const x = a < 1 && a < 1 || b'),
      'const x = a < 1 || b',
    )
    equal(
      await processJSRedundant('const x = a < 1 && a < 2 || b'),
      'const x = a < 1 && a < 2 || b',
    )
  })
})

/* global describe, before, after, it */
