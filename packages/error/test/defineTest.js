/**
 * Test for define.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert')
const define = require('../lib/define')

describe('define', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    let HogeError = define('HogeError')
    let error = new HogeError()
    ok(error)
    equal(error.name, 'HogeError')
  })
})

/* global describe, before, after, it */
