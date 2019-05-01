/**
 * Test for nameFile.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const nameFile = require('../lib/nameFile')

describe('name-file', () => {
  before(() => {})

  after(() => {})

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
