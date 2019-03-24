/**
 * Test for helpers.
 * Runs with mocha.
 */
'use strict'

import { normalizeOptions } from '../lib/helpers'
import React from 'react'
import { ok, deepEqual } from 'assert'

describe('helpers', () => {
  before(() => {
  })

  after(() => {
  })

  it('normalizeOptions', () => {
    ok(normalizeOptions)
    deepEqual(normalizeOptions([ 'foo' ]), { 'foo': 'foo' })
    deepEqual(normalizeOptions({ 'foo': 'bar' }), { 'foo': 'bar' })
  })
})

/* global describe, before, after, it */
