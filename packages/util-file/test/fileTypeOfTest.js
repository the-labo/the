'use strict'
/**
 * Test for fileTypeOf.
 * Runs with mocha.
 */
const { deepEqual } = require('assert').strict
const fileTypeOf = require('../lib/fileTypeOf')

describe('file-type-of', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    deepEqual(await fileTypeOf(`${__dirname}/../misc/mocks/mock-png.png`), {
      ext: 'png',
      mime: 'image/png',
    })
  })
})

/* global describe, before, after, it */
