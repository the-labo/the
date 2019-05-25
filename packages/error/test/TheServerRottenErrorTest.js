'use strict'
/**
 * Test for TheServerRottenError.
 * Runs with mocha.
 */
const { equal } = require('assert').strict
const TheServerRottenError = require('../lib/TheServerRottenError')

describe('the-server-rotten-error', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const e = new TheServerRottenError('hoge')
    equal(e.name, 'ServerRottenError')
  })
})

/* global describe, before, after, it */
