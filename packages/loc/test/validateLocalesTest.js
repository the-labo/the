/**
 * Test for validateLocales.
 * Runs with mocha.
 */
'use strict'

const validateLocales = require('../lib/helpers/validateLocales')
const {ok, equal} = require('assert')

describe('validate-locales', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    validateLocales({
      ja: {
        buttons: {DO_SUBMIT: 'Submit'}
      },
      en: {
        buttons: {DO_CANCEL: 'Cancel'}
      },
    })
  })
})

/* global describe, before, after, it */
