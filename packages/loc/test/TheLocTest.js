'use strict'
/**
 * Test for TheLoc.
 * Runs with mocha.
 */
const { deepEqual, doesNotThrow, equal, ok } = require('assert').strict
const TheLoc = require('../lib/TheLoc')

describe('the-loc', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const loc = new TheLoc({
      en: {
        app: {
          BANNER: 'say hello to #{app.NAME}',
          NAME: 'hoge',
        },
        errors: {
          MISSING_ERROR: '%(value)s is required',
        },
      },
      ja: {
        app: {
          BANNER: 'say hello to #{app.NAME}',
          NAME: 'hoge',
        },
      },
    })
    equal(loc.resolve('ja', 'app.BANNER'), 'say hello to hoge')
    const ja = loc.bind('ja')
    equal(ja('app.BANNER'), 'say hello to hoge')

    doesNotThrow(() => loc.bind('__invalid_lang__'))

    const en = loc.bind('en')
    equal(en('app', 'NAME'), 'hoge')
    equal(en('app.BANNER'), 'say hello to hoge')

    equal(en('errors', 'MISSING_ERROR', { value: 'hoge' }), 'hoge is required')

    equal(
      en('errors', 'MISSING_ERROR', {
        value: 'hoge',
      }),
      'hoge is required',
    )

    deepEqual(loc.toCompound(), {
      'app.BANNER*en': 'say hello to hoge',
      'app.BANNER*ja': 'say hello to hoge',
      'app.NAME*en': 'hoge',
      'app.NAME*ja': 'hoge',
      'errors.MISSING_ERROR*en': '%(value)s is required',
    })

    loc.validate()
  })

  it('Add messages', () => {
    const loc = new TheLoc(
      {
        en: {},
        ja: {
          buttons: {
            DO_OK: 'OK',
          },
        },
      },
      {},
    )
    ok(!loc.resolve('ja', 'buttons'))
  })

  it('Nested', () => {
    const loc = new TheLoc({
      ja: { v1: '#{v2}', v2: '#{v3}', v3: '#{v4}', v4: '#{v5}', v5: 999 },
    })

    equal(loc.ja.v1, '999')
  })
})

/* global describe, before, after, it */
