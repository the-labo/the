'use strict'
/**
 * Test for toLowerKeys.
 * Runs with mocha.
 */
const {
  strict: { deepEqual },
} = require('assert')
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
