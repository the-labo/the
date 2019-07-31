'use strict'

/**
 * Test case for doc.
 * Runs with mocha.
 */
const doc = require('../lib/doc')

describe('doc', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Jsdoc', async () => {
    await doc(`${__dirname}/../misc/mocks/mock-project-01`)
  })
})

/* global describe, before, after, it */
