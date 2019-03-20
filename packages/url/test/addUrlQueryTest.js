/**
 * Test for addUrlQuery.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert')
const addUrlQuery = require('../lib/addUrlQuery')

describe('add-query', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
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
  })
})

/* global describe, before, after, it */
