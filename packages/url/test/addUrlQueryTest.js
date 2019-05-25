'use strict'
/**
 * Test for addUrlQuery.
 * Runs with mocha.
 */
const { equal } = require('assert').strict
const addUrlQuery = require('../lib/addUrlQuery')

describe('add-query', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(addUrlQuery('/hoge?a=1', { b: 2 }), '/hoge?a=1&b=2')
    equal(
      addUrlQuery('http://hoge.com/hoge?x=1', { a: 'a1' }),
      'http://hoge.com/hoge?x=1&a=a1',
    )
    equal(
      addUrlQuery('http://hoge.com/hoge?', { a: 'a1' }),
      'http://hoge.com/hoge?a=a1',
    )
    equal(
      addUrlQuery('http://hoge.com/hoge', { a: 'a1' }),
      'http://hoge.com/hoge?a=a1',
    )
    equal(
      addUrlQuery('https://hoge.com:8080', { a: 'a1' }),
      'https://hoge.com:8080/?a=a1',
    )
    equal(
      addUrlQuery('/jj?x=1', { w: 0, y: null, z: void 0 }),
      '/jj?x=1&w=0&y=',
    )
  })
})

/* global describe, before, after, it */
