/**
 * Test case for wrap.
 * Runs with mocha.
 */
'use strict'

const coz = require('coz')
const wrap = require('../lib/Wrap')

describe('wrap', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Wrap', async () => {
    const bud = wrap({ cjs: true, name: 'withHoge' })
    bud.path = `${__dirname}/../tmp/withHoge.js`
    bud.mkdirp = true
    coz.render(bud)
  })
})

/* global describe, before, after, it */
