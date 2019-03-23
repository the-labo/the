/**
 * Test for shuffleSort.
 * Runs with mocha.
 */
'use strict'

const shuffleSort = require('../lib/shuffleSort')
const {ok, equal} = require('assert')

describe('shuffle-sort', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const sorted = [1, 2, 3].sort(shuffleSort())
    ok(sorted)
  })
})

/* global describe, before, after, it */
