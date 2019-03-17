/**
 * Test case for scopes.
 * Runs with mocha.
 */
'use strict'

const coz = require('coz')
const scopes = require('../lib/scopes')

describe('scopes', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Scopes', async () => {
    const bud = scopes({
      dirname: `${__dirname}/../misc/mocks/scopes`,
    })
    bud.path = `${__dirname}/../tmp/testing-scope-index.js`
    await coz.render(bud)
  })
})

/* global describe, before, after, it */
