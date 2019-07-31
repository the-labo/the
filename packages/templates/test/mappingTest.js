'use strict'

/**
 * Test case for mapping.
 * Runs with mocha.
 */
const coz = require('coz')
const mapping = require('../lib/mapping')

describe('mapping', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Mapping', async () => {
    const bud = mapping({
      mappings: {},
      requireAs: 'hoge',
      requirePath: '../hoge',
    })
    bud.mkdirp = true
    bud.path = `${__dirname}/../tmp/mapping/hoge.mapping.js`
    await coz.render(bud)
  })
})

/* global describe, before, after, it */
