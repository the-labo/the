/**
 * Test for normalizeString.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert')
const normalizeString = require('../lib/normalizeString')

describe('to-hankaku', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(
      normalizeString('あれは1１aAナニヌネノ-〜＝ーｶｷｸｹｺ'),
      'あれは11aAナニヌネノ-〜=ーカキクケコ',
    )
  })
})

/* global describe, before, after, it */
