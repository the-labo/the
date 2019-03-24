/**
 * Test for TheAccordionSection.
 * Runs with mocha.
 */
'use strict'

import TheAccordionSection from '../lib/TheAccordionSection'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-accordion-section', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheAccordionSection />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
