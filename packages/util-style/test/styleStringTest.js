'use strict'
/**
 * Test for styleString.
 * Runs with mocha.
 */
const { strictEqual: equal } = require('assert')
const styleString = require('../lib/styleString')

describe('style-string', () => {
  before(() => {})

  after(() => {})

  it('Convert style string', () => {
    const result = styleString('.foo', {
      backgroundColor: 'green',
      color: 'white',
      maxWidth: 1024,
    })
    equal(
      result,
      '\n.foo {\n    background-color:green;\n    color:white;\n    max-width:1024px;\n}\n',
    )
  })

  it('styleStringFromStyles', () => {
    const result = styleString.fromStyles({
      '.foo': {
        color: 'white',
      },
    })
    equal(result, '\n.foo {\n    color:white;\n}\n')
  })
})

/* global describe, before, after, it */
