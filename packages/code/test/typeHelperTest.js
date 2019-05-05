/**
 * Test for typeHelper.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const Types = require('../lib/constants/Types')
const typeHelper = require('../lib/helpers/typeHelper')

describe('type-helper', () => {
  before(() => {})

  after(() => {})

  it('typeOf', () => {
    equal(typeHelper.typeOf('foo/bar.js'), Types.JAVA_SCRIPT)
    equal(typeHelper.typeOf('foo/bar.yaml'), Types.YAML)
    equal(typeHelper.typeOf('foo/bar.yml'), Types.YAML)
  })
})

/* global describe, before, after, it */
