'use strict'

/**
 * Test case for stateful.
 * Runs with mocha.
 */
const coz = require('coz')
const Stateful = require('../lib/Stateful')

describe('stateful', function () {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Stateful', async () => {
    const bud = Stateful({
      name: 'hoge/hoge',
    })
    bud.path = `${__dirname}/../tmp/testing-Stateful.js`
    await coz.render(bud)
  })
})

/* global describe, before, after, it */
