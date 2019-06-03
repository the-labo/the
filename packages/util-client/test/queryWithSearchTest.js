/**
 * Test for queryWithSearch.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { deepEqual },
} = require('assert')
const queryWithSearch = require('../lib/queryWithSearch')

describe('query-with-search', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    deepEqual(queryWithSearch('a=b'), { a: 'b' })
  })
})

/* global describe, before, after, it */
