/**
 * Test for processJSXExpression.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal },
} = require('assert')
const processJSXExpression = require('../lib/processors/processJSXExpression')

describe('process-jsx-expression', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSXExpression(
        'const X = <span>{" "}{\'hoge\'}{n}abc{`this is ${b}`}</span>',
      ),
      'const X = <span> hoge{n}abc{`this is ${b}`}</span>',
    )
  })
})

/* global describe, before, after, it */
