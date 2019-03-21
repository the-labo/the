
/**
 * Test for processJSON.
 * Runs with mocha.
 */
'use strict'

const processJSON = require('../lib/processors/processJSON')
const {ok, equal} = require('assert')

describe('process-json', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    equal(
      await processJSON(`{"foo":"bar", "a":1}`),
      `{
  "a": 1,
  "foo": "bar"
}
`
    )
  })
})

/* global describe, before, after, it */
