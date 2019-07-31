'use strict'

/**
 * Test for finder.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const finder = require('../lib/finder')
const parse = require('../lib/parse')

describe('finder', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const node = parse(`
const x = [1,2,3]
const [x1] = x
const [, x2] = x
    `)
    const found = finder.findByTypes(node, ['ArrayExpression', 'ArrayPattern'])
    equal(found.length, 3)
  })
})

/* global describe, before, after, it */
