'use strict'

/**
 * Test for withClient.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const withClient = require('../lib/withClient')

describe('with-client', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const WithClient = withClient(
      class {
        get client() {
          return {
            host: 'example.com',
            protocol: 'https:',
          }
        }
      },
    )
    const instance = new WithClient()
    const url = instance.clientUrlFor('/hoge', {
      foo: {
        bar: 'baz',
      },
    })
    equal(url, 'https://example.com/hoge?foo%5Bbar%5D=baz')
  })
})

/* global describe, before, after, it */
