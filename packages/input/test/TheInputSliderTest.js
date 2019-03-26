/**
 * Test for TheInputSlider.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheInputSlider from '../lib/TheInputSlider'

describe('the-input-slider', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheInputSlider />)
    ok(element)
  })
})

/* global describe, before, after, it */
