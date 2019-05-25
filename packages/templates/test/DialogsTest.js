'use strict'
/**
 * Test case for dialogs.
 * Runs with mocha.
 */
const coz = require('coz')
const dialogs = require('../lib/Dialogs')

describe('dialogs', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Dialogs', async () => {
    const bud = dialogs({
      dirname: `${__dirname}/../misc/mocks`,
    })
    bud.path = `${__dirname}/../tmp/Dialogs.js`
    bud.mkdirp = true
    coz.render(bud)
  })
})

/* global describe, before, after, it */
