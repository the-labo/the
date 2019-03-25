/**
 * Test for nameFile.
 * Runs with mocha.
 */
'use strict'

const nameFile = require('../lib/nameFile')
const { ok, equal } = require('assert')

describe('name-file', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    equal(
      nameFile({
        dir: 'hoge',
        name: 'f1',
        type: 'text/plain',
      }),
      'hoge/f1.txt',
    )
  })
})

/* global describe, before, after, it */
