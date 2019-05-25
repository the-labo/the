'use strict'
/**
 * Test case for dir.
 * Runs with mocha.
 */
const coz = require('coz')
const dir = require('../lib/dir')

describe('dir', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Dir', async () => {
    const bud = dir({
      default: 'dddd',
      description: 'hoge',
      dirname: __dirname,
      name: 'foo',
    })
    bud.path = `${__dirname}/../tmp/testing-dir/index.mjs`
    bud.mkdirp = true
    await coz.render(bud)
  })

  it('CJS', async () => {
    const bud = dir({
      cjs: true,
      default: 'dir_test',
      description: 'hoge',
      dirname: __dirname,
      name: 'foo',
    })
    bud.path = `${__dirname}/../tmp/testing-dir/index.js`
    bud.mkdirp = true
    await coz.render(bud)
  })
})

/* global describe, before, after, it */
