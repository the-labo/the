/**
 * Test case for scene.
 * Runs with mocha.
 */
'use strict'

const coz = require('coz')
const scene = require('../lib/Scene')

describe('scene', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Scene', async () => {
    const bud = scene({ cjs: true, name: 'hoge' })
    bud.path = `${__dirname}/../tmp/HogeScene.js`
    bud.mkdirp = true
    coz.render(bud)
  })
})

/* global describe, before, after, it */
