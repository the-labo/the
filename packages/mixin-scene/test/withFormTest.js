'use strict'
/**
 * Test for withForm.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const withForm = require('../lib/withForm')

describe('with-form', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const Form = withForm(class WithForm {})
    const f = new Form()
    ok(f.postForm)
    ok(f.sendForm)
    ok(f._createFormData)
  })
})

/* global describe, before, after, it */
