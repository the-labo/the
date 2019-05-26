'use strict'
/**
 * Test for TheAccordionSection.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheAccordionSection } = require('../shim/TheAccordionSection')

describe('the-accordion-section', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheAccordionSection))
  })
})

/* global describe, before, after, it */
