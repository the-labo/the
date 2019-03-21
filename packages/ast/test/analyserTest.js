/**
 * Test for analyser.
 * Runs with mocha.
 */
'use strict'

const analyser = require('../lib/analyser')
const finder = require('../lib/finder')
const parse = require('../lib/parse')
const { ok, equal, deepEqual } = require('assert').strict

describe('analyser', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const parsed = parse(`
const a = [1,2,3]
const b = [
  4,
  5,
  6,
]
    `)
    const arrays = finder.findByTypes(parsed, ['ArrayExpression'])
    equal(arrays.length, 2)

    ok(analyser.isSingleLine(arrays[0]))
    ok(!analyser.isSingleLine(arrays[1]))
  })
})

/* global describe, before, after, it */
