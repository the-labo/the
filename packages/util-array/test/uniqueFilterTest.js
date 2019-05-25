'use strict'
/**
 * Test for uniqueFilter.
 * Runs with mocha.
 */
const { deepEqual } = require('assert').strict
const uniqueFilter = require('../lib/uniqueFilter')

describe('unique-filter', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    deepEqual(['a', 'b', 'c', 'a'].filter(uniqueFilter()), ['a', 'b', 'c'])

    deepEqual(
      [{ id: 1 }, { id: 2 }, { id: 1 }].filter(
        uniqueFilter({
          by: ({ id }) => id,
        }),
      ),
      [{ id: 1 }, { id: 2 }],
    )

    deepEqual([{ id: 1 }, { id: 2 }, { id: 1 }].filter(uniqueFilter.by('id')), [
      { id: 1 },
      { id: 2 },
    ])
  })
})

/* global describe, before, after, it */
