'use strict'

/**
 * Test case for eslintignore.
 * Runs with mocha.
 */
const coz = require('coz')
const eslintignore = require('../lib/eslintignore')

describe('eslintignore', function () {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Eslintignore', async () => {
    const bud = eslintignore()
    bud.mkdirp = true
    bud.path = `${__dirname}/../tmp/eslintrc/.eslintignore`
    await coz.render(bud)
  })
})

/* global describe, before, after, it */
