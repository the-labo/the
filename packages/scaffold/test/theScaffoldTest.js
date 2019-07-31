'use strict'

/**
 * Test case for theScaffold.
 * Runs with mocha.
 */
const theScaffold = require('../lib/theScaffold')

describe('the-scaffold', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Generate task', async () => {
    await theScaffold('ui', `${__dirname}/../tmp/foo/bar-ui`, {
      force: true,
      straight: true,
    })
  })
})

/* global describe, before, after, it */
