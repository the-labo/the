'use strict'
/**
 * Test for toLowerKeys.
 * Runs with mocha.
 */
const { deepEqual } = require('assert').strict
const toLowerKeys = require('../lib/toLowerKeys')

describe('to-lower-keys', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    deepEqual(toLowerKeys({ Baz: 'quz', foo: 'bar' }), {
      baz: 'quz',
      foo: 'bar',
    })
  })
})

/* global describe, before, after, it */
