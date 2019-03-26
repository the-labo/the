/**
 * Test for TheSection.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheSection from '../lib/TheSection'

describe('the-section', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheSection />)
    ok(element)
  })
})

/* global describe, before, after, it */
