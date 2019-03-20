/**
 * Test case for build.
 * Runs with mocha.
 */
'use strict'

const build = require('../lib/build')

describe('build', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Build', async () => {
    await build(`${__dirname}/../misc/mocks/mock-project-01`)
  })
})

/* global describe, before, after, it */
