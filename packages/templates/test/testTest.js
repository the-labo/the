'use strict'

/**
 * Test case for test.
 * Runs with mocha.
 */
const coz = require('coz')
const test = require('../lib/test')

describe('test', function () {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Test', async () => {
    const bud = test({
      dest: `${__dirname}/../tmp/foo/test`,
      src: `${__dirname}/../misc/mocks/*.jsx`,
    })
    await coz.render(bud)
  })

  it('TestDir', async () => {
    const bud = test.dir({
      dest: `${__dirname}/../tmp/foo/test/`,
      node: true,
      src: `${__dirname}/../misc/mocks`,
    })
    await coz.render(bud)
  })
})

/* global describe, before, after, it */
