/**
 * @file Test for cleanupRedundantObjectPatternOnObjectExpression.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const cleanupRedundantObjectPatternOnObjectExpression = require('../lib/ast/nodes/cleanupRedundantObjectPatternOnObjectExpression')

describe('cleanup-redundant-object-pattern-on-object-expression', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(cleanupRedundantObjectPatternOnObjectExpression)
  })
})

/* global describe, before, after, it */
