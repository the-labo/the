/**
 * Test for shuffleSort.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const shuffleSort = require('../lib/shuffleSort')

describe('shuffle-sort', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const sorted = [1, 2, 3].sort(shuffleSort())
    ok(sorted)
  })
})

/* global describe, before, after, it */
