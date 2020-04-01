'use strict'

/**
 * Test case for errorPage.
 * Runs with mocha.
 */
const coz = require('coz')
const errorPage = require('../lib/errorPage')

describe('error-page', function () {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Error page', async () => {
    const bud = errorPage({
      pkg: {},
      texts: ['foo', 'bar'],
      title: 'hoge',
    })
    bud.path = `${__dirname}/../tmp/error.html`
    bud.mkdirp = true
    coz.render(bud)
  })
})

/* global describe, before, after, it */
