/**
 * Test case for ctrl.
 * Runs with mocha.
 */
'use strict'

const coz = require('coz')
const ctrl = require('../lib/Ctrl')

describe('ctrl', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Ctrl', async () => {
    const bud = ctrl({
      cjs: true,
      memberof: 'module:server.controllers',
      name: 'AppCtrl',
    })
    bud.path = `${__dirname}/../tmp/AppCtrl.js`
    bud.mkdirp = true
    coz.render(bud)
  })
})

/* global describe, before, after, it */
