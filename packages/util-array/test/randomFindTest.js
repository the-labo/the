/**
 * Test for randomFind.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
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
