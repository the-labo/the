/**
 * Test for formatUrl.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const formatUrl = require('../lib/formatUrl')

describe('format-url', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(formatUrl('/foo/:id', { id: 2 }), '/foo/2')

    equal(formatUrl('/foo/?id=:id', { id: 2 }), '/foo/?id=2')

    equal(
      formatUrl('/foo/?name=:name', { name: 'a/b/c' }),
      '/foo/?name=a%2Fb%2Fc',
    )

    equal(formatUrl('/foo/:hoge', { x: 1, y: 2 }), '/foo/:hoge')

    equal(formatUrl('/foo/:hoge.json', { hoge: 'a' }), '/foo/a.json')

    equal(
      formatUrl('https://github.com/api/users/:username', { username: 'hoge' }),
      'https://github.com/api/users/hoge',
    )
  })
})

/* global describe, before, after, it */
