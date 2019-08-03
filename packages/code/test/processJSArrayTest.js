/**
 * Test for processJSArray.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const processJSArray = require('../lib/processors/processJSArray')

describe('process-js-array', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(processJSArray)

    equal(
      await processJSArray('const a = [1, ...[2, 3]]'),
      'const a = [1, 2, 3]',
    )

    equal(
      await processJSArray('const b = [1, [], ...[]]'),
      'const b = [1, [], ]',
    )

    equal(
      await processJSArray('const c = [1, /* 2 to 5 */...[2,3,4,5]]'),
      'const c = [1, 2,3,4,5]',
    )
  })
})

/* global describe, before, after, it */
