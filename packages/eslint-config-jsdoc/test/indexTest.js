'use strict'

/**
 * Test case for index
 */
const {
  strict: { ok },
} = require('assert')
const index = require('../index')

describe('index', () => {
  it('rules', () => {
    for (const [k, v] of Object.entries(index.rules)) {
      ok(/jsdoc/.test(k), `[${k}] valid prefix`)
      const level = Array.isArray(v) ? v[0] : v
      ok(['error', 'warn', 'off'].includes(level), `[${k}] valid level`)
    }
  })
})

/* global describe, it */
