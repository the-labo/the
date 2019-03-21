/**
 * Test for validateLocales.
 * Runs with mocha.
 */
'use strict'

const validateLocales = require('../lib/helpers/validateLocales')

describe('validate-locales', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    validateLocales({
      en: {
        buttons: { DO_CANCEL: 'Cancel' },
      },
      ja: {
        buttons: { DO_SUBMIT: 'Submit' },
      },
    })
  })
})

/* global describe, before, after, it */
