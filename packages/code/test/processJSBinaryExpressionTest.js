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

  it('Compare operator', async () => {
    equal(
      await processJSBinaryExpression(`if (action === 'PUSH') {}`),
      "if (action === 'PUSH') {}",
    )
    equal(
      await processJSBinaryExpression(`if ('PUSH' === action) {}`),
      "if (action === 'PUSH') {}",
    )
  })

  it('Keep in operator', async () => {
    equal(
      await processJSBinaryExpression(`for(const a in b) {} `),
      `for(const a in b) {} `,
    )
    equal(
      await processJSBinaryExpression(`for(const a of b) {} `),
      `for(const a of b) {} `,
    )
  })

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
    equal(await processJSBinaryExpression('z = `a` + `b`'), 'z = `ab`')
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

  it('Normalize operator', async () => {
    equal(
      await processJSBinaryExpression(`const a = b == 'x'`),
      "const a = b == 'x'",
    )
    equal(
      await processJSBinaryExpression(`const a = b === 'x'`),
      "const a = b === 'x'",
    )
    equal(
      await processJSBinaryExpression(`const a = b != 'x'`),
      "const a = b != 'x'",
    )
    equal(
      await processJSBinaryExpression(`const a = b !== 'x'`),
      "const a = b !== 'x'",
    )
  })

  it('Swap compare operator', async () => {
    equal(await processJSBinaryExpression(`const a = x > 1`), 'const a = 1 < x')
    equal(await processJSBinaryExpression(`const a = 1 > x`), 'const a = x < 1')
    equal(
      await processJSBinaryExpression(`const a = x >= 1`),
      'const a = 1 <= x',
    )
    equal(
      await processJSBinaryExpression(`const a = 1 >= x`),
      'const a = x <= 1',
    )
    equal(
      await processJSBinaryExpression(`const a = 1 <= x`),
      'const a = 1 <= x',
    )

    equal(await processJSBinaryExpression(`const a = 1 + x`), 'const a = 1 + x')
  })
})

/* global describe, before, after, it */
