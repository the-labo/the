'use strict'
/**
 * Test for normalizeString.
 * Runs with mocha.
 */
const { equal } = require('assert').strict
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
