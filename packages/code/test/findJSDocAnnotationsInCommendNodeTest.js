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
      loc: {
        start: { line: 0 },
      },
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

    equal(annotations.length, 3)
  })

  it('simple function', () => {
    const annotations = findJSDocAnnotationsInCommendNode({
      loc: {
        start: { line: 0 },
      },
      start: 0,
      value: `*
 * @function
 * @param {number} x
 *`,
    })
    equal(annotations.length, 2)
    for (const annotation of annotations) {
      equal(typeof annotation.start, 'number')
      equal(typeof annotation.end, 'number')
    }
  })

  it('Without body', () => {
    const annotations = findJSDocAnnotationsInCommendNode({
      loc: {
        start: { line: 0 },
      },
      start: 0,
      value: `*
 * @function
 * @param {number} x
 *`,
    })
    equal(annotations[0].body, null)
  })

  it('Multiple body less annotations', () => {
    const annotations = findJSDocAnnotationsInCommendNode({
      loc: {
        start: { line: 0 },
      },
      start: 0,
      value: `*
 * @inner
 * @class`,
    })
    equal(annotations.length, 2)
    equal(annotations[0].body, null)
    equal(annotations[0].kind.name, 'inner')
    equal(annotations[1].body, null)
    equal(annotations[1].kind.name, 'class')
  })
})

/* global describe, before, after, it */
