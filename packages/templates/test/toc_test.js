/**
 * Test case for toc.
 * Runs with mocha.
 */
'use strict'

const coz = require('coz')
const toc = require('../lib/toc')

describe('toc', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Toc', async () => {
    const bud = toc({
      src: `${__dirname}/../misc/mocks/FOO.md`,
    })

    bud.path = `${__dirname}/../tmp/toc/toc.md`
    bud.mkdirp = true

    coz.render(bud)
  })
})

/* global describe, before, after, it */
