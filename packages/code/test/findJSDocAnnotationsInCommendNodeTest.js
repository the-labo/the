/**
 * Test for findJSDocAnnotationsInCommendNode.
 * Runs with mocha.
 */
'use strict'

const { deepEqual } = require('assert').strict
const findJSDocAnnotationsInCommendNode = require('../lib/ast/nodes/findJSDocAnnotationsInCommendNode')

describe('find-js-doc-annotations-in-commend-node', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const annotations = findJSDocAnnotationsInCommendNode({
      value: `*
 * Shirt module.
 * @module my/shirt
 * @example
const shirt = require('my/shirt')
console.log(shirt)
 * @link x`,
    })
    deepEqual(annotations, [
      { type: 'module', value: 'my/shirt' },
      {
        type: 'example',
        value: "\nconst shirt = require('my/shirt')\nconsole.log(shirt)",
      },
      { type: 'link', value: 'x' },
    ])
  })
})

/* global describe, before, after, it */
