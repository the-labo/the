/**
 * Test for generateFile.
 * Runs with mocha.
 */
'use strict'

const generateFile = require('../lib/generateFile')

describe('generate-file', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    await generateFile(`${__dirname}/../tmp/hoge/hoge.txt`, async function*() {
      yield 'this '
      yield 'is '
      yield 'hoge '
    })
  })
})

/* global describe, before, after, it */
