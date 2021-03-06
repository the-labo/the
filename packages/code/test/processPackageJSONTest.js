'use strict'

/**
 * @file Test for processPackageJSON.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const processPackageJSON = require('../lib/processors/processPackageJSON')

describe('process-package-jso-n', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    equal(
      await processPackageJSON(
        '{"version":"1.2.3", "name":"hoge", "dependencies": {"b":"1", "a":"2"}}',
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
