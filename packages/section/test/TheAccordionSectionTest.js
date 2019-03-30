/**
 * Test for TheAccordionSection.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheAccordionSection = require('../shim/TheAccordionSection').default

describe('the-accordion-section', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheAccordionSection))
  })
})

/* global describe, before, after, it */
