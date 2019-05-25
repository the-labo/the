'use strict'
/**
 * Test for waitFor.
 * Runs with mocha.
 */
const waitFor = require('../lib/waitFor')

describe('wait-for-file', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    let ready = false
    setTimeout(() => {
      ready = true
    }, 100)
    await waitFor(() => ready)
  })
})

/* global describe, before, after, it */
