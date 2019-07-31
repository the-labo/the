'use strict'

/**
 * Test case for eslintrc.
 * Runs with mocha.
 */
const coz = require('coz')
const eslintrc = require('../lib/eslintrc')

describe('eslintrc', function() {
  this.timeout(3000)

  before(async () => {})

  after(async () => {})

  it('Eslintrc', async () => {
    const bud = eslintrc({
      additional: {
        rules: {
          'use-isnan': 'error',
        },
      },
      jsdoc: false,
    })
    bud.mkdirp = true
    bud.path = `${__dirname}/../tmp/eslintrc/.eslintrc.yml`
    await coz.render(bud)
  })
})

/* global describe, before, after, it */
