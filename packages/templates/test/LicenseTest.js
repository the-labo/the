/**
 * Test case for license.
 * Runs with mocha.
 */
'use strict'

const coz = require('coz')
const License = require('../lib/License')

describe('license', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('License', async () => {
    const bud = License({
      holder: 'hoge',
      type: 'MIT',
    })
    bud.mkdirp = true
    bud.path = `${__dirname}/../tmp/licence/MIT.md`
    coz.render(bud)
  })
})

/* global describe, before, after, it */
