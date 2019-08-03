/**
 * Test for cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode = require('../lib/ast/nodes/cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode')

describe('cleanup-empty-line-between-properties-on-object-expression-node', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode)
  })
})

/* global describe, before, after, it */
