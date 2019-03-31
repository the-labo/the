/**
 * Test for parser.
 * Runs with mocha.
 */
'use strict'

const { deepEqual } = require('assert')
const { parseSort } = require('../lib/helpers/parser')

describe('parser', () => {
  before(() => {})

  after(() => {})

  it('Parse sort', () => {
    deepEqual(parseSort('foo,-bar'), {
      bar: -1,
      foo: 1,
    })
  })
})

/* global describe, before, after, it */
