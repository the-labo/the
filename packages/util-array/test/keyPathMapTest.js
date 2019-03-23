/**
 * Test for keyPathMap.
 * Runs with mocha.
 */
'use strict'

const { deepEqual } = require('assert')
const keyPathMap = require('../lib/keyPathMap')

describe('key-path-map', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    deepEqual(
      [{ foo: { bar: 10 } }, { foo: { bar: 20 } }].map(keyPathMap('foo.bar')),
      [10, 20],
    )
  })
})

/* global describe, before, after, it */
