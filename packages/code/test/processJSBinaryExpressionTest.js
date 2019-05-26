/**
 * Test for processJSBinaryExpression.
 * Runs with mocha.
 */
'use strict'
/* eslint-disable no-template-curly-in-string */
const {
  strict: { equal },
} = require('assert')
const processJSBinaryExpression = require('../lib/processors/processJSBinaryExpression')

describe('process-js-logical-expression', () => {
  before(() => {})

  after(() => {})

  it('Compare operator', async () => {
    equal(
      await processJSBinaryExpression("if (action === 'PUSH') {}"),
      "if (action === 'PUSH') {}",
    )
    equal(
      await processJSBinaryExpression("if ('PUSH' === action) {}"),
      "if (action === 'PUSH') {}",
    )
  })

  it('Keep operators', async () => {
    equal(
      await processJSBinaryExpression('for(const a in b) {} '),
      'for(const a in b) {} ',
    )
    equal(
      await processJSBinaryExpression('for(const a of b) {} '),
      'for(const a of b) {} ',
    )
    equal(
      await processJSBinaryExpression('const x = a + 1; const y = b + 1;'),
      'const x = a + 1; const y = b + 1;',
    )
  })

  it('Embed value', async () => {
    equal(
      await processJSBinaryExpression('const a = "aaa" + bbb'),
      'const a = `aaa${bbb}`',
    )
    equal(
      await processJSBinaryExpression('const a = "aaa" + \'bbb\''),
      'const a = `aaabbb`',
    )

    equal(
      await processJSBinaryExpression('const a = "aaa" + \'${bbb}\''),
      'const a = `aaa\\${bbb}`',
    )
  })

  it('With Template literal', async () => {
    equal(await processJSBinaryExpression("z = `aaa` + 'bbb'"), 'z = `aaabbb`')
    equal(
      await processJSBinaryExpression('z = `aaa${x}` + "bbb"'),

      'z = `aaa${x}bbb`',
    )
    equal(
      await processJSBinaryExpression('z = `aaa${x}nn` + " bbb"'),
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
      await processJSBinaryExpression("const a = b == 'x'"),
      "const a = b == 'x'",
    )
    equal(
      await processJSBinaryExpression("const a = b === 'x'"),
      "const a = b === 'x'",
    )
    equal(
      await processJSBinaryExpression("const a = b != 'x'"),
      "const a = b != 'x'",
    )
    equal(
      await processJSBinaryExpression("const a = b !== 'x'"),
      "const a = b !== 'x'",
    )
  })

  it('Fix yoda', async () => {
    equal(await processJSBinaryExpression('x = a === 1'), 'x = a === 1')
    equal(await processJSBinaryExpression('x = 1 === a'), 'x = a === 1')
    equal(await processJSBinaryExpression('x = a == 1'), 'x = a == 1')
    equal(await processJSBinaryExpression('x = 1 == a'), 'x = a == 1')
    equal(await processJSBinaryExpression('x = a !== 1'), 'x = a !== 1')
    equal(await processJSBinaryExpression('x = 1 !== a'), 'x = a !== 1')
    equal(await processJSBinaryExpression('x = a != 1'), 'x = a != 1')
    equal(await processJSBinaryExpression('x = 1 != a'), 'x = a != 1')
    equal(await processJSBinaryExpression('x = b() != a'), 'x = b() != a')
    equal(await processJSBinaryExpression('x = a != b()'), 'x = a != b()')
  })
})

/* global describe, before, after, it */
