/**
 * Test for TheSection.
 * Runs with mocha.
 */
'use strict'

import TheSection from '../lib/TheSection'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-section', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheSection />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
