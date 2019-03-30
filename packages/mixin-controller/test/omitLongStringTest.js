/**
 * Test for omitLongString.
 * Runs with mocha.
 */
'use strict'

const omitLongString = require('../lib/helpers/omitLongString')
const { ok, equal, deepStrictEqual } = require('assert')

describe('omit-too-long-string', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    equal(
      omitLongString(null),
      null,
    )
    equal(
      omitLongString('too long text', {maxLength: 3}),
      'too...',
    )
    deepStrictEqual(
      omitLongString(['foo', 'barrrr', 2000], {maxLength: 3}),
      ['foo', 'bar...', 2000],
    )
    deepStrictEqual(
      omitLongString({a: {b: {c: ['too long text']}}}, {maxLength: 3}),
      {a: {b: {c: ['too...']}}}
    )
    deepStrictEqual(
      omitLongString({a: [1, {b: 'abc', c: 'abc', d: 'abcd'}], e: null, f: true}, {maxLength: 3}),
      {a: [1, {b: 'abc', c: 'abc', d: 'abc...'}], e: null, f: true}
    )
  })
})

/* global describe, before, after, it */
