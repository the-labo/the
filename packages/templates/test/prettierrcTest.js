'use strict'

/**
 * Test case for prettierrc.
 * Runs with mocha.
 */
const coz = require('coz')
const prettierrc = require('../lib/prettierrc')

describe('prettierrc', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Prettierrc', async () => {
    const bud = prettierrc()
    bud.mkdirp = true
    bud.path = `${__dirname}/../tmp/prettierrc/.prettierrc.yml`
    await coz.render(bud)
  })
})

/* global describe, before, after, it */
