/**
 * Test for contentAccess.
 * Runs with mocha.
 */
'use strict'

const { deepEqual } = require('assert').strict
const contentAccess = require('../lib/helpers/contentAccess')

describe('content-access', () => {
  before(() => {})

  after(() => {})

  it('enclosedRange', () => {
    const { enclosedRange } = contentAccess(
      `const x = ({a,b}) => console.log(b)`,
    )
    deepEqual(enclosedRange([13, 15], { left: '(', right: ')' }), [10, 17])
    deepEqual(enclosedRange([13, 15], { left: '{', right: '}' }), [11, 16])
  })
})

/* global describe, before, after, it */
