/**
 * @file Test for formatJSDocCommentOnCommentNode.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const formatJSDocCommentOnCommentNode = require('../lib/ast/nodes/formatJSDocCommentOnCommentNode')

describe('format-js-doc-comment-on-comment-node', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(formatJSDocCommentOnCommentNode)
  })
})

/* global describe, before, after, it */
