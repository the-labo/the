/**
 * @file Test for cleanupRedundantArrayPatternOnArrayExpression.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const cleanupRedundantArrayPatternOnArrayExpression = require('../lib/ast/nodes/cleanupRedundantArrayPatternOnArrayExpression')

describe('cleanup-redundant-array-pattern-on-array-expression', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(cleanupRedundantArrayPatternOnArrayExpression)
  })
})

/* global describe, before, after, it */
