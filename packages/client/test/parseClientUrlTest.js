'use strict'

const { parseClientUrl } = require('../lib/helpers')
const { equal } = require('assert').strict

/**
 * @file Test for parseClientUrl.
 * Runs with mocha.
 */
describe('parse-client-url', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {

    const parsed = parseClientUrl({
      hostname: 'xxxx',
      pathname: '/x',
      port: 3000
    })
    equal(parsed, 'http://xxxx:3000/x')
  })
})

/* global describe, before, after, it */
