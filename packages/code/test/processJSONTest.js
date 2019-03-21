/**
 * Test for processJSON.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert')
const processJSON = require('../lib/processors/processJSON')

describe('process-json', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processJSON(`{"foo":"bar", "a":1}`),
      `{
  "a": 1,
  "foo": "bar"
}
`,
    )
  })
})

/* global describe, before, after, it */
