/**
 * Test for readAsYaml.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const readAsYaml = require('../lib/readAsYaml')

describe('read-as-yaml', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const data = await readAsYaml(`${__dirname}/../misc/mocks/mock-yaml.yml`)
    ok(data)
    equal(data.scenarios.yaml_example['retrieve-resources'], false)
  })
})

/* global describe, before, after, it */
