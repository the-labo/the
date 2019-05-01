/**
 * Test for sumReducer.
 * Runs with mocha.
 */
'use strict'

const { deepEqual } = require('assert').strict
const sumReducer = require('../lib/sumReducer')

describe('sum-reducer', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    deepEqual([1, 2, 5, 7].reduce(sumReducer(), 0), 15)

    deepEqual(
      [{ v: 1 }, { v: 2 }, { v: 5 }, { v: 7 }].reduce(sumReducer.of('v'), 0),
      15,
    )
  })
})

/* global describe, before, after, it */
