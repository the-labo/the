/**
 * Test for toLowerKeys.
 * Runs with mocha.
 */
'use strict'

const toLowerKeys = require('../lib/toLowerKeys')
const {ok, equal, deepEqual} = require('assert')

describe('to-lower-keys', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    deepEqual(
      toLowerKeys({foo: 'bar', 'Baz': 'quz'}),
      {foo: 'bar', 'baz': 'quz'}
    )
  })
})

/* global describe, before, after, it */
