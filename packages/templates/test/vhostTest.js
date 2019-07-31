'use strict'

/**
 * Test case for vhost.
 * Runs with mocha.
 */
const coz = require('coz')
const vhost = require('../lib/vhost')

describe('vhost', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Vhost', async () => {
    const bud = vhost({
      domain: 'the.example.com',
      port: 8080,
    })
    bud.path = `${__dirname}/../tmp/vhost.conf`
    bud.mkdirp = true
    coz.render(bud)
  })
})

/* global describe, before, after, it */
