/**
 * Test case for index
 */
'use strict'

const { ok } = require('assert')
const index = require('../index')

describe('index', () => {

  it('rules', () => {
    for (const [k, v] of Object.entries(index.rules)) {
      const level = Array.isArray(v) ? v[0] : v
      ok(['error', 'warn', 'off', 0].includes(v), `[${level}] valid level`)
    }
  })
})

/* global describe, it */
