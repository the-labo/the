/**
 * Test case for theScaffold.
 * Runs with mocha.
 */
'use strict'

const theScaffold = require('../lib/theScaffold')

describe('the-scaffold', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Generate task', async () => {
    await theScaffold('component', `${__dirname}/../tmp/foo/bar-component`, {
      force: true,
      straight: true,
    })
  })
})

/* global describe, before, after, it */
