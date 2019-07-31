'use strict'

/**
 * Test for randomFind.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const randomFind = require('../lib/randomFind')

describe('random-find', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const found = [1, 2, 3].find(randomFind())
    ok([1, 2, 3].includes(found))
  })
})

/* global describe, before, after, it */
