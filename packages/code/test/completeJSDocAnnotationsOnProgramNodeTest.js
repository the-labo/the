/**
 * Test for completeJSDocAnnotationsOnProgramNode.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const completeJSDocAnnotationsOnProgramNode = require('../lib/ast/nodes/completeJSDocAnnotationsOnProgramNode')

describe('complete-js-doc-annotations-on-program-node', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(completeJSDocAnnotationsOnProgramNode)
  })
})

/* global describe, before, after, it */
