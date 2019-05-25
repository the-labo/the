'use strict'
/**
 * Test for define.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const define = require('../lib/define')

describe('define', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const HogeError = define('HogeError')
    const error = new HogeError()
    ok(error)
    equal(error.name, 'HogeError')
  })
})

/* global describe, before, after, it */
