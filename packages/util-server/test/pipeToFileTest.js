/**
 * Test for pipeToFile.
 * Runs with mocha.
 */
'use strict'

const pipeToFile = require('../lib/pipeToFile')

describe('pipe-to-file', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    await pipeToFile(
      `${__dirname}/../misc/mocks/hoge.txt`,
      `${__dirname}/../tmp/hogehoge.txt`,
    )
  })
})

/* global describe, before, after, it */
