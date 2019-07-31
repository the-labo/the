'use strict'

/**
 * Test case for nginx.
 * Runs with mocha.
 */
const coz = require('coz')
const nginx = require('../lib/nginx')

describe('nginx', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Nginx', async () => {
    const bud = nginx({})

    bud.mkdirp = true
    bud.path = `${__dirname}/../tmp/foo/nginx.vhost`
    await coz.render(bud)
  })
})

/* global describe, before, after, it */
