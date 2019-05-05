/**
 * Test for processPackageJSON.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const processPackageJSON = require('../lib/processors/processPackageJSON')

describe('process-package-jso-n', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processPackageJSON(
        `{"version":"1.2.3", "name":"hoge", "dependencies": {"b":"1", "a":"2"}}`,
      ),
      `{
  "name": "hoge",
  "version": "1.2.3",
  "dependencies": {
    "a": "2",
    "b": "1"
  }
}
`,
    )
  })
})

/* global describe, before, after, it */
