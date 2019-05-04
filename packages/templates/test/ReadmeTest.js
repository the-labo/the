/**
 * Test for Readme.
 * Runs with mocha.
 */
'use strict'

const Readme = require('../lib/Readme')
const coz = require('coz')
const jsdoc = require('../misc/mocks/mock-jsdoc')

describe('readme', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    coz.render(
      Readme({
        path: `${__dirname}/../tmp/foo/test-README.md`,
        pkg: {},
        sections: '*.md.hbs',
        api: {
          path: `${__dirname}/../tmp/foo/test-api.md`,
          jsdoc,
        },
        repo: 'https://example.com',
      }),
    )
  })
})

/* global describe, before, after, it */
