/**
 * Test for TheAccordionSection.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheAccordionSection from '../lib/TheAccordionSection'

describe('the-accordion-section', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheAccordionSection />)
    ok(element)
  })
})

/* global describe, before, after, it */
