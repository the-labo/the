/**
 * Test for withForm.
 * Runs with mocha.
 */
'use strict'

const withForm = require('../lib/withForm')
const { ok, equal } = require('assert')

describe('with-form', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const Form = withForm(
      class WithForm {}
    )
    const f = new Form()
    ok(f.postForm)
    ok(f.sendForm)
    ok(f._createFormData)
  })
})

/* global describe, before, after, it */
