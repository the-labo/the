'use strict'
/**
 * Test for findJSDocAnnotationsInCommendNode.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const findJSDocAnnotationsInCommendNode = require('../lib/ast/nodes/findJSDocAnnotationsInCommendNode')

describe('find-js-doc-annotations-in-commend-node', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const annotations = findJSDocAnnotationsInCommendNode({
      start: 0,
      value: `*
 * Shirt module.
 * @module my/shirt
 * @example
const shirt = require('my/shirt')
console.log(shirt)
 * @link x`,
    })
    equal(annotations[0].kind.name, 'module')
    equal(annotations[2].body.value, 'x')
    equal(
      annotations[1].body.value,
      `const shirt = require('my/shirt')
console.log(shirt)`,
    )
  })
})

/* global describe, before, after, it */
