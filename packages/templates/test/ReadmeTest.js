/**
 * Test for Readme.
 * Runs with mocha.
 */
'use strict'

const coz = require('coz')
const Readme = require('../lib/Readme')
const jsdoc = require('../misc/mocks/mock-jsdoc')

describe('readme', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    coz.render(
      Readme({
        api: {
          jsdoc,
          path: `${__dirname}/../tmp/foo/test-api.md`,
        },
        path: `${__dirname}/../tmp/foo/test-README.md`,
        pkg: {},
        repo: 'https://example.com',
        sections: '*.md.hbs',
      }),
    )
  })
})

/* global describe, before, after, it */
