/**
 * Test for writeAsYaml.
 * Runs with mocha.
 */
'use strict'

const writeAsYaml = require('../lib/writeAsYaml')

describe('write-as-yaml', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    await writeAsYaml(`${__dirname}/../tmp/foo/bar/x.yaml`, {
      a: [{ b: 1 }, 2],
      x: 1,
    })
  })
})

/* global describe, before, after, it */
