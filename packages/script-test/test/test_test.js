'use strict'

/**
 * Test case for test.
 * Runs with mocha.
 */
const test = require('../lib/test')

describe('test', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Test', async () => {
    await test(`${__dirname}/../misc/mocks/mock-project-01`)
  })
})

/* global describe, before, after, it */
