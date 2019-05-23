/**
 * Test for processJSBinaryExpression.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const processJSBinaryExpression = require('../lib/processors/processJSBinaryExpression')

describe('process-js-logical-expression', () => {
  before(() => {})

  after(() => {})

  it('Embed value', async () => {
    equal(
      await processJSBinaryExpression(`const a = "aaa" + bbb`),
      'const a = `aaa${bbb}`',
    )
    equal(
      await processJSBinaryExpression(`const a = "aaa" + 'bbb'`),
      'const a = `aaabbb`',
    )

    equal(
      await processJSBinaryExpression(`const a = "aaa" + '\${bbb}'`),
      'const a = `aaa\\${bbb}`',
    )
  })

  it('With Template literal', async () => {
    equal(
      await processJSBinaryExpression(`z = \`aaa\` + 'bbb'`),
      'z = `aaabbb`',
    )
    equal(
      await processJSBinaryExpression(`z = \`aaa\${x}\` + "bbb"`),
      'z = `aaa${x}bbb`',
    )
    equal(
      await processJSBinaryExpression(`z = \`aaa\${x}nn\` + " bbb"`),
      'z = `aaa${x}nn bbb`',
    )
    equal(
      await processJSBinaryExpression("z = `a` + `b`"),
      "z = `ab`"
    )
  })

  it('With back slash', async () => {
    equal(
      await processJSBinaryExpression('const a = "aaa" + \'bbb`\''),
      'const a = `aaabbb\\``',
    )
    equal(
      await processJSBinaryExpression('const a = "aaa" + \'bbb${x}\''),
      'const a = `aaabbb\\${x}`',
    )
  })
})

/* global describe, before, after, it */
