/**
 * Test for TheInputSlider.
 * Runs with mocha.
 */
'use strict'

import TheInputSlider from '../lib/TheInputSlider'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-input-slider', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheInputSlider />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
