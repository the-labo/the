/**
 * Test for envOf.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert')
const envOf = require('../lib/envOf')

describe('env-of', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    process.env.TESTING_ENV_HOGE = 'hoge'
    equal(envOf('TESTING_ENV_HOGE'), 'hoge')
  })
})

/* global describe, before, after, it */
