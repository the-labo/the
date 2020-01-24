/**
 * @file Test for ignoreFilter.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { deepEqual, ok },
} = require('assert')
const ignoreFilter = require('../lib/helpers/ignoreFilter')

describe('ignore-filter', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(ignoreFilter)
    const filter = ignoreFilter(`${__dirname}/../misc/mocks/mock-ignore`)
    ok(filter)
    deepEqual(['hoge', 'x'].filter(filter), ['x'])

    ok([__filename].filter(filter))
  })
})

/* global describe, before, after, it */
