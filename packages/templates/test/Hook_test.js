/**
 * Test case for hook.
 * Runs with mocha.
 */
'use strict'

const coz = require('coz')
const hook = require('../lib/Hook')

describe('hook', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Hook', async () => {
    const bud = hook({ cjs: true, name: 'HogeHook' })
    bud.path = `${__dirname}/../tmp/HogeHook.js`
    bud.mkdirp = true
    coz.render(bud)
  })
})

/* global describe, before, after, it */
